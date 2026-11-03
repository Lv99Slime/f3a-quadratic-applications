/* E1.3 應用題：Motion Prompt elements ported to WAAPI/SVG (same ports as the Test 3 review deck).
   Every effect is skipped when 動畫：關 or prefers-reduced-motion is on; content never depends on it.
   Row reveal uses the rise from #005 without its coral line (teacher feedback 2026-10-28).
   Motion Prompt #005 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#005
   Motion Prompt #080 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#080
   Motion Prompt #001 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#001
   Motion Prompt #004 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#004
   Motion Prompt #007 · MIT License (c) 2026 Shohei Ohtaki · https://showheyohtaki.github.io/motion-prompt/#007 */
window.AM = (function () {
  'use strict';
  const EASE_IO3 = 'cubic-bezier(.65,0,.35,1)';   // cubic ease-in-out
  const EASE_OUT5 = 'cubic-bezier(.23,1,.32,1)';  // quintic ease-out
  const EASE_OUT3 = 'cubic-bezier(.33,1,.68,1)';  // cubic ease-out
  const reduced = () => typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const on = () => !reduced() && !document.documentElement.classList.contains('motion-off');
  const can = el => el && typeof el.animate === 'function' && on();

  // #005 rise only: the element comes up from below over 0.65 s, quintic ease-out. No line.
  function rise(els, stagger = 0) {
    [].concat(els).forEach((el, i) => {
      if (!can(el)) return;
      el.animate([{ opacity: 0, transform: 'translateY(0.7em)' }, { opacity: 1, transform: 'none' }], { duration: 650, delay: i * stagger, easing: EASE_OUT5, fill: 'backwards' });
    });
  }

  // #080 Highlighter: a #FFE36B stroke drawn left to right behind the key words, 0.8 s cubic ease-out.
  function highlight(scope, sel = '.hl', stagger = 0) {
    if (!scope) return;
    scope.querySelectorAll(sel).forEach((el, i) => {
      if (!can(el)) return;
      el.animate([{ backgroundSize: '0% 46%' }, { backgroundSize: '100% 46%' }], { duration: 800, delay: 250 + i * stagger, easing: EASE_OUT3, fill: 'backwards' });
    });
  }

  // #001 Pop-in: scale 1 − e^(−6.5t)·cos(15t) (peak ≈ 1.26) with rotation −0.35 rad → 0 via 1 − e^(−6t)·cos(11t).
  function popIn(el, delay = 0) {
    if (!can(el)) return;
    const frames = [];
    for (let i = 0; i <= 36; i++) {
      const t = i / 36 * 1.2;
      const s = 1 - Math.exp(-6.5 * t) * Math.cos(15 * t);
      const r = -0.35 * Math.exp(-6 * t) * Math.cos(11 * t);
      frames.push({ transform: `rotate(${r}rad) scale(${Math.max(0, s)})`, offset: i / 36 });
    }
    el.animate(frames, { duration: 1200, delay, easing: 'linear', fill: 'backwards' });
  }

  // #004 Line draw: trim-path draw-on over 1.55 s (cubic ease-in-out); optional yellow tip dot on the leading end.
  function lineDraw(path, tip, delay = 0) {
    if (!path || !can(path) || typeof path.getTotalLength !== 'function') return;
    const L = path.getTotalLength();
    path.style.strokeDasharray = `${L}`;
    const a = path.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: 1550, delay, easing: EASE_IO3, fill: 'backwards' });
    a.finished.then(() => { path.style.strokeDasharray = ''; }).catch(() => {});
    if (!tip) return;
    const t0 = performance.now() + delay, io = p => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    const tick = now => {
      if (!tip.isConnected) return;
      if (now < t0) { requestAnimationFrame(tick); return; }
      tip.style.display = '';
      const p = Math.min(1, (now - t0) / 1550), pt = path.getPointAtLength(L * io(p));
      tip.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
      if (p < 1) requestAnimationFrame(tick); else tip.style.display = 'none';
    };
    requestAnimationFrame(tick);
  }

  // #007 Count-up: value = from + (to − from)·(1 − (1 − p)^4) over 2.45 s, then the colour switches and the
  // number bounces 1 + 0.07·e^(−7t)·cos(15t). fmt formats the shown value (default: integer).
  function countUp(el, from, to, fmt = v => String(Math.round(v))) {
    if (!el) return;
    el.textContent = fmt(to);
    if (!can(el) || from === to) return;
    const t0 = performance.now(), D = 2450;
    el.classList.remove('landed');
    const tick = now => {
      if (!el.isConnected) return;
      const p = Math.min(1, (now - t0) / D);
      el.textContent = fmt(from + (to - from) * (1 - Math.pow(1 - p, 4)));
      if (p < 1) { requestAnimationFrame(tick); return; }
      el.textContent = fmt(to);
      el.classList.add('landed');
      const frames = [];
      for (let i = 0; i <= 24; i++) { const t = i / 24 * .8; frames.push({ transform: `scale(${1 + .07 * Math.exp(-7 * t) * Math.cos(15 * t)})`, offset: i / 24 }); }
      el.animate(frames, { duration: 800, easing: 'linear' });
    };
    requestAnimationFrame(tick);
  }

  return { rise, highlight, popIn, lineDraw, countUp, on };
})();
