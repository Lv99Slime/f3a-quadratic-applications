/* E1.3 一元二次方程的應用：樣稿 r2（解題七步 + 四類例題，每題三頁：審設／表列／解驗答）。
   Questions: E1_一元二次方程_完整學生工作紙_v1.0 p.12–14 (E1.3(1)–(4) 例題).
   Answers: approved remaining_v1.1_20260930/Answer_Key.md (L101, L201, L203, L301, L401); nothing new is assessed here.
   Layout (teacher, 2026-11-03): one thing per click, figure above text, question folded to one line on pages 2–3. */
window.DECK = window.DECK || [];
(function () {
  'use strict';
  const C = '#2454a4', R = '#d34b36', HL = '#c8711e', G = '#0f766e', INK = '#17212e', MUTED = '#7a828c';
  // "<x" inside innerHTML would open a tag, so inequality signs go to TeX as \lt / \gt.
  const M = s => `\\(${String(s).replace(/</g, '\\lt ').replace(/>/g, '\\gt ')}\\)`;
  const btn = (a, label, cls = '') => `<button type="button" data-a="${a}" class="pbtn ${cls}">${label}</button>`;
  const qk = s => `<span class="qk">${s}</span>`;
  const tx = (x, y, s, size = 18, color = INK, weight = 500, anchor = 'middle', extra = '') => `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="middle" fill="${color}" font-size="${size}" font-weight="${weight}" font-family="Noto Sans TC,Microsoft JhengHei,sans-serif"${extra}>${s}</text>`;
  const fmt2 = v => (Math.round(v * 100) / 100).toFixed(2);
  const anim = () => window.AM;
  const actions = `<div class="actions">${btn('prev', '上一步')}${btn('next', '下一步', 'primary')}${btn('reset', '重設')}</div>`;

  // ---------- 共用 ----------
  const STEPS = ['審', '設', '表', '列', '解', '驗', '答'];
  const stepBar = on => `<div class="step-bar" aria-label="解題步驟，現在：${on || '未開始'}">${STEPS.map(k => `<span class="sb${k === on ? ' on' : ''}" data-k="${k}">${k}</span>`).join('')}</div>`;
  const slideOf = h => (typeof h.closest === 'function' ? h.closest('.slide') : null);

  // Highlight the key words of the original question.
  function keys(h, on, animate) {
    const sl = slideOf(h);
    if (!sl) return;
    sl.classList.toggle('keys-on', on);
    if (on && animate && anim()) anim().highlight(sl.querySelector('.points'), '.qk', 140);
  }

  // Pages 2–3: the question shrinks to one line; 「原題」 opens it again (it is never removed).
  function foldQuestion(h) {
    const sl = slideOf(h);
    if (!sl || sl.querySelector('.q-toggle')) return;
    sl.classList.add('qfold');
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'q-toggle'; b.textContent = '原題 ▾';
    b.onclick = () => { const open = sl.classList.toggle('q-open'); b.textContent = open ? '收起原題 ▴' : '原題 ▾'; if (window.MJ) window.MJ(sl); };
    const fit = sl.querySelector('.col-fit');
    if (fit) fit.insertBefore(b, fit.querySelector('.points'));
  }

  // The engine only fits height; shrink the whole panel evenly when it is wider than the stage, so columns never overlap.
  function fitWidth(h) {
    const p = h.querySelector('.apps-panel');
    if (!p || !h.clientWidth) return;
    p.style.zoom = '';
    const need = p.scrollWidth, have = h.clientWidth;
    if (need > have + 1) p.style.zoom = String(Math.max(0.6, have / need));
  }
  function afterTypeset(h, tries = 0) {
    const done = () => { fitWidth(h); if (window.MJ) window.MJ(h); };
    if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([h]).then(done).catch(done);
    else if (tries < 60 && typeof setTimeout === 'function') setTimeout(() => afterTypeset(h, tries + 1), 200);
    else done();
    if (!h._ro && typeof ResizeObserver === 'function') { h._ro = new ResizeObserver(() => fitWidth(h)); h._ro.observe(h); }
  }

  // Step page: every item is laid out (hidden) from the start, so nothing moves; each click shows one item.
  // items: {k, html, cls, join}. join = shown on the same line as the previous item, as its own step.
  // fig(step) returns the SVG above the list; live: {setup(root, redraw)} runs once for the last-step controls.
  function stepPage(h, cfg) {
    const items = cfg.items, max = items.length;
    const rows = [];
    items.forEach((it, i) => {
      const s = i + 1;
      if (it.join && rows.length) { rows[rows.length - 1].body += `<span class="sp-join" data-step="${s}">${it.html}</span>`; return; }
      const prevK = rows.length ? rows[rows.length - 1].k : '';
      rows.push({ s, k: it.k || '', tag: it.k && it.k !== prevK ? it.k : '', cls: it.cls || '', body: it.html });
    });
    const list = rows.map(r => `<div class="sp-item ${r.cls}" data-step="${r.s}"><span class="aw-k"${r.tag ? ` data-k="${r.tag}"` : ''}>${r.tag}</span><div class="sp-body">${r.body}</div></div>`).join('');
    h.innerHTML = `<div class="pilot-panel lesson-panel apps-panel sp"><div class="sp-head"><div class="aw-bar"></div><div class="step-count"></div></div>${cfg.carry ? `<div class="sp-carry">${cfg.carry}</div>` : ''}${cfg.fig ? `<div class="sp-fig${cfg.figCls ? ' ' + cfg.figCls : ''}"></div>` : ''}<div class="sp-list">${list}</div>${actions}</div>`;
    const q = a => h.querySelector(`[data-a="${a}"]`), figEl = h.querySelector('.sp-fig');
    const stepEls = [...h.querySelectorAll('.sp [data-step]')];
    let step = 0;
    const redraw = () => { if (figEl && cfg.fig) figEl.innerHTML = cfg.fig(step); };
    const draw = fwd => {
      h.querySelector('.step-count').textContent = `${step} / ${max}`;
      q('prev').disabled = step === 0;
      q('next').disabled = step === max;
      stepEls.forEach(el => el.classList.toggle('on', +el.dataset.step <= step));
      let k = '';
      for (let j = 0; j < step; j++) if (items[j].k) k = items[j].k;
      h.querySelector('.aw-bar').innerHTML = stepBar(step ? k : '');
      if (cfg.keys) keys(h, step >= 1, fwd && step === 1);
      redraw();
      if (!fwd || !anim()) return;
      anim().rise(stepEls.filter(el => +el.dataset.step === step));
      if (items[step - 1].k && items[step - 1].k !== (items[step - 2] || {}).k) anim().popIn(h.querySelector('.aw-bar .sb.on'));
      if (cfg.onStep) cfg.onStep(step, h);
    };
    q('prev').onclick = () => { step = Math.max(0, step - 1); draw(false); };
    q('next').onclick = () => { step = Math.min(max, step + 1); draw(true); };
    q('reset').onclick = () => { step = 0; if (cfg.onReset) cfg.onReset(); draw(false); };
    if (cfg.fold) foldQuestion(h);
    if (cfg.live) cfg.live(h, redraw, () => step === max);
    draw(false);
    afterTypeset(h);
  }

  // Worked page: rows {k, l, r} line up on "=", rows {k, h} span; cols = [[rows], [rows]]; the last step shows 常見錯誤.
  function worked(h, cfg) {
    const all = cfg.cols.flat(), max = all.length + (cfg.trap ? 1 : 0);
    let i = 0;
    const rowHTML = r => {
      const tag = `<span class="aw-k"${r.k ? ` data-k="${r.k}"` : ''}>${r.k || ''}</span>`;
      const body = r.h !== undefined ? `<span class="aw-h">${r.h}</span>` : `<span class="aw-l">${r.l ? M(r.l) : ''}</span><span class="aw-eq">${M('=')}</span><span class="aw-r">${M(r.r)}${r.note ? `<small class="aw-note">${r.note}</small>` : ''}</span>`;
      return `<div class="aw-row ${r.cls || ''}" data-i="${i++}">${tag}${body}</div>`;
    };
    const trap = cfg.trap ? `<div class="trap-card aw-trap"><span class="card-chip trap">常見錯誤</span><ul>${cfg.trap.map(s => `<li>${s}</li>`).join('')}</ul></div>` : '';
    const cols = cfg.cols.map((rows, c) => `<div class="aw-col"><div class="aw-grid">${rows.map(rowHTML).join('')}</div>${c === cfg.cols.length - 1 ? trap : ''}</div>`).join('');
    const fig = cfg.figHTML ? `<div class="aw-fig ${cfg.figCls || ''}">${cfg.figHTML}</div>` : '';
    h.innerHTML = `<div class="pilot-panel lesson-panel apps-panel"><div class="sp-head"><div class="aw-bar"></div><div class="step-count"></div></div>${cfg.carry ? `<div class="sp-carry">${cfg.carry}</div>` : ''}${fig}<div class="aw-cols cols-${cfg.cols.length}">${cols}</div>${actions}</div>`;
    const q = a => h.querySelector(`[data-a="${a}"]`), rows = [...h.querySelectorAll('.aw-row')], trapEl = h.querySelector('.aw-trap');
    let step = 0;
    const draw = forward => {
      h.querySelector('.step-count').textContent = `${step} / ${max}`;
      q('prev').disabled = step === 0;
      q('next').disabled = step === max;
      rows.forEach((r, j) => r.classList.toggle('shown', j < step));
      if (trapEl) trapEl.classList.toggle('shown', step > all.length);
      let k = '';
      for (let j = 0; j < Math.min(step, all.length); j++) if (all[j].k) k = all[j].k;
      h.querySelector('.aw-bar').innerHTML = stepBar(step ? k : '');
      if (!forward || !anim()) return;
      if (step > all.length) { anim().popIn(trapEl.querySelector('.card-chip')); anim().highlight(trapEl); return; }
      const row = rows[step - 1];
      anim().rise([...row.children]);
      if (row.querySelector('.aw-k[data-k]')) anim().popIn(h.querySelector('.aw-bar .sb.on'));
    };
    q('prev').onclick = () => { step = Math.max(0, step - 1); draw(false); };
    q('next').onclick = () => { step = Math.min(max, step + 1); draw(true); };
    q('reset').onclick = () => { step = 0; draw(false); };
    if (cfg.fold !== false) foldQuestion(h);
    draw(false);
    afterTypeset(h);
  }

  const known = s => `<span class="lbl">已知</span>${s}`;
  const find = s => `<span class="lbl find">求</span>${s}`;
  const eqLine = (s, lead = '') => `<span class="eq-line">${lead}<span class="eq-math">${M(s)}</span></span>`;
  const presetBtns = (vals, label) => `<span class="presets">${vals.map(v => `<button type="button" class="pbtn mini" data-v="${v}">${label(v)}</button>`).join('')}</span>`;
  const tryLbl = '<span class="lbl try">試一試</span>';
  // Coloured terms: one MathJax piece per term inside a coloured span (TeX \color{#…} fails on "#").
  const cM = parts => parts.map(([c, s]) => c ? `<span style="color:${c}">${M(s)}</span>` : M(`{}${s}{}`)).join('');

  // ---------- 頁1：解應用題七步 ----------
  const SEVEN = [
    ['審', '讀題', '給了甚麼？求甚麼？', '圈出已知的數量和單位，劃出「求」的部分；留意「連續」「正整數」「等闊」等限制字眼。'],
    ['設', '設未知數', '未知數代表甚麼？', `寫完整：「設較小的數為 ${M('n')}」「設邊框闊度為 ${M('x')} cm」。通常設所求的量。`],
    ['表', '表示其他量', '其他量怎樣用它寫？', `畫圖或列表，把相關的量用未知數寫出，例如較大的數 ${M('n+1')}、卡紙長 ${M('(36+2x)')} cm。`],
    ['列', '列方程', '哪兩個量相等？', '找出題目中的等量關係（「是」「等於」「比……大」「共」），寫成一條方程。'],
    ['解', '解方程', '用哪種方法？', '化成一般形式，選用因式分解、公式法或配方法。'],
    ['驗', '檢驗', '每個根都合題意嗎？', '代回原題核對；檢查正數、整數、邊長、範圍等限制，捨去不合的根並寫出理由。'],
    ['答', '作答', '答了「求」的部分嗎？', '用完整句子回答題目所求，附單位；可能多於一組答案。']
  ];
  function sevenSteps(h) {
    let step = 0, last = 0;
    h.innerHTML = `<div class="pilot-panel lesson-panel apps-panel"><div class="sp-head"><span></span><div class="step-count"></div></div><div class="apps-content"></div>${actions}</div>`;
    const body = h.querySelector('.apps-content'), q = a => h.querySelector(`[data-a="${a}"]`);
    const draw = () => {
      if (window.MathJax && MathJax.typesetClear) MathJax.typesetClear([body]);
      const n = step, fwd = step > last;
      h.querySelector('.step-count').textContent = `${n} / 8`;
      q('prev').disabled = n === 0; q('next').disabled = n === 8;
      const cards = SEVEN.map((s, i) => `<div class="ss-card${i < n ? ' shown' : ''}${i === Math.min(n, 7) - 1 && n < 8 ? ' now' : ''}" data-k="${s[0]}"><b>${s[0]}</b><span>${s[1]}</span><small>${s[2]}</small></div>`).join('');
      const groups = `<div class="ss-groups${n === 8 ? ' shown' : ''}"><span class="g1">文字 → 方程</span><span class="g2">數學</span><span class="g3">方程 → 文字</span></div>`;
      const d = n >= 1 && n <= 7 ? SEVEN[n - 1] : null;
      const detail = d ? `<p class="ss-detail"><b data-k="${d[0]}">${d[0]}｜${d[1]}</b>${d[3]}</p>` : n === 8 ? '<p class="ss-detail">最難的是<b class="g1c">審、設、表、列</b>：把文字逐句變成數學。解完方程後，要<b class="g3c">驗、答</b>：把根放回題目的情境。</p>' : '<p class="ss-detail"></p>';
      body.innerHTML = `<div class="ss-flow">${cards}</div>${groups}${detail}`;
      last = step;
      if (window.MJ) window.MJ(h);
      if (!fwd || !anim()) return;
      if (n <= 7) anim().popIn(body.querySelectorAll('.ss-card')[n - 1].querySelector('b'));
      else anim().rise([...body.querySelectorAll('.ss-groups span')], 160);
      anim().rise(body.querySelector('.ss-detail'));
    };
    q('prev').onclick = () => { step = Math.max(0, step - 1); draw(); };
    q('next').onclick = () => { step = Math.min(8, step + 1); draw(); };
    q('reset').onclick = () => { step = 0; last = 0; draw(); };
    draw();
    afterTypeset(h);
  }

  // ---------- E1.3(1) 例題1：整數 ----------
  const intQ = [`兩個${qk('連續正整數')}的${qk('積')}比它們的${qk('和')}${qk('大 19')}，求這兩個數。`];
  const nbox = (label, s) => `<span class="nbox"><small>${label}</small><span>${M(s)}</span></span>`;
  const arrow = `<svg class="tr-arrow" viewBox="0 0 90 24" aria-hidden="true"><path class="tr-line" d="M4 12 H78" stroke="${HL}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M72 5 L84 12 L72 19" stroke="${HL}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const trRow = (chip, s) => `<span class="tr-row"><span class="tr-chip">${chip}</span>${arrow}<span class="tr-math">${M(s)}</span></span>`;
  function barModel() {
    const y1 = 10, y2 = 72, hb = 44, x0 = 60, xe = 500, xm = 320;
    return `<svg class="bar-model" viewBox="0 0 520 126" role="img" aria-label="長條圖：積的長度等於和加上 19">
      ${tx(30, y1 + hb / 2, '積', 20, C, 700)}${tx(30, y2 + hb / 2, '和', 20, G, 700)}
      <rect x="${x0}" y="${y1}" width="${xe - x0}" height="${hb}" rx="4" fill="#e7eef9" stroke="${C}" stroke-width="2.5"/>${tx((x0 + xe) / 2, y1 + hb / 2, 'n(n + 1)', 22, C, 600, 'middle', ' font-style="italic"')}
      <rect x="${x0}" y="${y2}" width="${xm - x0}" height="${hb}" rx="4" fill="#dff1ed" stroke="${G}" stroke-width="2.5"/>${tx((x0 + xm) / 2, y2 + hb / 2, '2n + 1', 22, G, 600, 'middle', ' font-style="italic"')}
      <g class="pop b19"><rect x="${xm + 4}" y="${y2}" width="${xe - xm - 4}" height="${hb}" rx="4" fill="#fbe7c8" stroke="${HL}" stroke-width="2.5" stroke-dasharray="7 5"/>${tx((xm + xe) / 2 + 2, y2 + hb / 2, '19', 24, HL, 700)}</g>
    </svg>`;
  }
  const intP1 = h => stepPage(h, {
    keys: true,
    items: [
      { k: '審', html: known('兩個數是<b>連續</b>的<b>正整數</b>。') },
      { k: '審', html: known('它們的<b>積</b>比它們的<b>和</b>大 19。') },
      { k: '審', html: find('這兩個數。') },
      { k: '設', html: `設較小的數為 ${M('n')}。${nbox('較小的數', 'n')}` },
      { k: '設', html: `連續整數相差 1，較大的數為 ${M('n+1')}。${nbox('較大的數', 'n+1')}` }
    ],
    onStep: (s, h) => { if (s >= 4) anim().popIn(h.querySelector(`[data-step="${s}"] .nbox`)); }
  });
  const intP2 = h => stepPage(h, {
    fold: true, carry: `設較小的數為 ${M('n')}，較大的數為 ${M('n+1')}。`,
    items: [
      { k: '表', html: trRow('它們的積', 'n(n+1)') },
      { k: '表', html: trRow('它們的和', 'n+(n+1)=2n+1') },
      { k: '列', html: `「積比和大 19」：${barModel()}` },
      { k: '列', html: eqLine('n(n+1)-(2n+1)=19', '<span class="lbl eq">方程</span>') }
    ],
    onStep: (s, h) => {
      const el = h.querySelector(`[data-step="${s}"]`);
      if (s <= 2) anim().lineDraw(el.querySelector('.tr-line'));
      if (s === 3) anim().popIn(el.querySelector('.b19'), 300);
    }
  });
  const intRows = [[
    { k: '設', h: `設較小的數為 ${M('n')}，則較大的數為 ${M('n+1')}（${M('n')} 為正整數）。` },
    { k: '列', l: 'n(n+1)-(2n+1)', r: '19' },
    { k: '解', l: 'n^2+n-2n-1', r: '19' },
    { l: 'n^2-n-20', r: '0' },
    { l: '(n-5)(n+4)', r: '0' },
    { h: `${M('n=5')} 或 ${M('n=-4')}` }
  ], [
    { k: '驗', h: `${M('\\because n')} 為正整數，${M('n=-4')} 不合，捨去。` },
    { h: `代回：${M('5\\times6=30')}，${M('5+6=11')}，${M('30-11=19')} ✓` },
    { k: '答', h: '這兩個數是 5 和 6。', cls: 'answer' }
  ]];
  const intTrap = [`${M('n=-4')} 得 −4 和 −3：積 12、和 −7，相差也是 19！方程本身沒有錯，是「<span class="hl">正</span>整數」這個條件把它捨去。`];

  // ---------- E1.3(2) 例題1：直角三角形 ----------
  const triQ = [`在直角三角形 ${M('ABC')} 中，${qk(M('\\angle ABC=90^\\circ'))}，${qk(M('AB=(12+k)'))} cm，${qk(M('BC=40'))} cm，${qk(M('AC=(32-3k)'))} cm。`, `(a) 求 ${M('k')}。　(b) 求三角形 ${M('ABC')} 的面積。`];
  // Right angle at the bottom-left vertex. o.names (top, corner, right), o.bc (length of the base), o.S (px per unit).
  function triSVG(o) {
    const S = o.S || 5, bc = o.bc || 40, [nA, nB, nC] = o.names || ['A', 'B', 'C'];
    const Bx = 130, By = 272, ab = o.ab, A = [Bx, By - S * ab], Cp = [Bx + S * bc, By];
    const hot = o.hyp, acW = hot ? 6 : 3, acC = hot ? HL : INK;
    let g = `<path d="M${A[0]} ${A[1]} L${Bx} ${By} L${Cp[0]} ${Cp[1]}" fill="none" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
    g += `<path class="ac-line" d="M${A[0]} ${A[1]} L${Cp[0]} ${Cp[1]}" fill="none" stroke="${o.acBad ? R : acC}" stroke-width="${acW}" stroke-linecap="round"${o.acBad ? ' stroke-dasharray="8 7"' : ''}/>`;
    if (o.fill) g += `<path d="M${A[0]} ${A[1]} L${Bx} ${By} L${Cp[0]} ${Cp[1]}Z" fill="#e7eef9" stroke="none"/>`;
    g += `<path class="pop ra" d="M${Bx} ${By - 18} H${Bx + 18} V${By}" fill="none" stroke="${o.ra ? R : INK}" stroke-width="${o.ra ? 3.5 : 2.5}"/>`;
    if (!o.noNames) g += tx(A[0] - 6, A[1] - 16, nA, 20, INK, 700) + tx(Bx - 18, By + 14, nB, 20, INK, 700) + tx(Cp[0] + 16, Cp[1] + 14, nC, 20, INK, 700);
    if (o.labels) {
      g += tx(Bx - 14, (A[1] + By) / 2, o.abLabel, 18, C, 600, 'end');
      g += tx((Bx + Cp[0]) / 2, By + 22, o.bcLabel, 18, G, 600);
      const mx = (A[0] + Cp[0]) / 2 + 14, my = (A[1] + Cp[1]) / 2 - 12;
      if (o.acLabel) g += tx(mx, my, o.acLabel, 18, o.acBad ? R : hot ? HL : INK, 700, 'start');
      if (hot && !o.live) g += tx(mx, my + 24, `斜邊（∠${nB} 的對邊）`, 15, HL, 600, 'start');
      if (o.mid) g += tx((Bx + Cp[0]) / 2 - 10, (A[1] + By) / 2 + 30, o.mid, 18, C, 700);
    }
    return `<svg viewBox="0 0 ${Math.max(480, Cp[0] + 140)} 300" role="img" aria-label="直角三角形 ${nA}${nB}${nC}，直角在 ${nB}">${g}</svg>`;
  }
  const triFixed = { ab: 26, abLabel: '(12 + k) cm', bcLabel: '40 cm', acLabel: '(32 − 3k) cm' };
  const triP1 = h => stepPage(h, {
    keys: true,
    fig: s => s ? triSVG({ ...triFixed, ra: s >= 1, labels: s >= 2 }) : '',
    items: [
      { k: '審', html: known(`${M('\\angle ABC=90^\\circ')}：直角在 ${M('B')}。`) },
      { k: '審', html: known(`三條邊都用 ${M('k')} 表示：${M('AB=(12+k)')}、${M('BC=40')}、${M('AC=(32-3k)')}。`) },
      { k: '審', html: find(`(a) ${M('k')}；(b) 三角形的面積。`) },
      { k: '設', html: `未知數 ${M('k')} 已由題目給出，毋須另設。` }
    ],
    onStep: (s, h) => { if (s === 1) anim().popIn(h.querySelector('.ra')); }
  });
  function triP2(h) {
    let k = 0;
    const vals = () => { const ab = 12 + k, ac = 32 - 3 * k; return { ab, ac, lhs: ab * ab + 1600, rhs: ac * ac }; };
    const liveMsg = () => {
      const { ab, ac, lhs, rhs } = vals(), eq = lhs === rhs;
      const verdict = ac <= 0 ? (eq ? '兩邊相等，但 AC ≤ 0，不是三角形的邊' : '✗ AC ≤ 0，不是三角形的邊') : eq ? '✓ 相等：方程成立，三邊皆正' : '✗ 不相等';
      return `AB² + BC² = ${ab}² + 40² = <b>${lhs}</b>　　AC² = ${ac < 0 ? `(${ac})` : ac}² = <b>${rhs}</b>　　<span class="verdict ${eq && ac > 0 ? 'ok' : 'no'}">${verdict}</span>`;
    };
    stepPage(h, {
      fold: true, carry: `${M('\\angle B=90^\\circ')}；${M('AB=(12+k)')}，${M('BC=40')}，${M('AC=(32-3k)')}`,
      fig: s => {
        if (s === 4) { const { ab, ac } = vals(); return triSVG({ ab, hyp: true, live: true, labels: true, acBad: ac <= 0, abLabel: `AB = ${ab}`, bcLabel: 'BC = 40', acLabel: ac > 0 ? `AC = ${ac}` : `AC = ${ac} ≤ 0 ✗` }); }
        return triSVG({ ...triFixed, labels: true, hyp: s >= 1, ra: s >= 1 });
      },
      items: [
        { k: '表', html: `直角在 ${M('B')}，它的對邊 ${M('AC')} 是<b>斜邊</b>。` },
        { k: '列', html: `畢氏定理：${cM([[C, 'AB^2'], ['', '+'], [G, 'BC^2'], ['', '='], [HL, 'AC^2']])}` },
        { k: '列', html: `<span class="eq-line"><span class="lbl eq">方程</span><span class="eq-math">${cM([[C, '(12+k)^2'], ['', '+'], [G, '40^2'], ['', '='], [HL, '(32-3k)^2']])}</span></span>` },
        { html: `${tryLbl}<span class="ictrl inline"><label for="kRange">${M('k')}</label><input id="kRange" type="range" min="-11" max="31" step="1" value="0"><span class="ival">0</span>${presetBtns([-3, 0, 30], x => `k = ${x}`)}</span><div class="live-msg"></div>`, cls: 'live' }
      ],
      onStep: (s, h) => { if (s === 1) anim().lineDraw(h.querySelector('.ac-line')); },
      onReset: () => { k = 0; },
      live: (h, redraw, isLive) => {
        const range = h.querySelector('#kRange'), msg = h.querySelector('.live-msg');
        const set = v => { k = v; range.value = k; h.querySelector('.ival').textContent = k; msg.innerHTML = liveMsg(); if (isLive()) redraw(); };
        range.oninput = () => set(+range.value);
        h.querySelectorAll('[data-v]').forEach(b => { b.onclick = () => { set(+b.dataset.v); if (anim()) anim().popIn(msg.querySelector('.verdict')); }; });
        h.querySelector('[data-a="reset"]').addEventListener('click', () => set(0));
        set(0);
      }
    });
  }
  const triRows = [[
    { k: '列', h: `${M('\\because \\angle ABC=90^\\circ')}，${M('AC')} 為斜邊。` },
    { l: 'AB^2+BC^2', r: 'AC^2', note: '畢氏定理' },
    { l: '(12+k)^2+40^2', r: '(32-3k)^2' },
    { k: '解', l: '144+24k+k^2+1600', r: '1024-192k+9k^2' },
    { l: '8k^2-216k-720', r: '0' },
    { l: 'k^2-27k-90', r: '0' },
    { l: '(k-30)(k+3)', r: '0' },
    { h: `${M('k=30')} 或 ${M('k=-3')}` }
  ], [
    { k: '驗', h: `${M('k=30')}：${M('AC=32-90=-58<0')}，不合，捨去。` },
    { h: `${M('k=-3')}：${M('AB=9')}，${M('AC=41')}，三邊皆正 ✓` },
    { k: '答', h: `(a) ${M('k=-3')}`, cls: 'answer' },
    { h: `(b) 面積 ${M('=\\dfrac12\\times9\\times40=180\\ \\text{cm}^2')}`, cls: 'answer' }
  ]];
  const triTrap = [`捨去的是 ${M('k=30')}（正數）；${M('k=-3')} 是負數，但三邊都是正數，所以接受。`, '檢驗看的是<span class="hl">邊長</span>是否為正，不是 k 是否為正。'];

  // ---------- E1.3(2) 例題2：畫框 ----------
  const frameQ = [`一幅長 ${qk('36 cm')}、闊 ${qk('28 cm')} 的畫貼在長方形卡紙中央，四周留有${qk('等闊')}邊框。若${qk('邊框面積')}為 ${qk('168 cm²')}，求邊框闊度。`];
  function frameSVG(x, st) {
    const S = 6.5, cx = 220, cy = 168, pw = 36 * S, ph = 28 * S, ow = (36 + 2 * x) * S, oh = (28 + 2 * x) * S;
    const ox = cx - ow / 2, oy = cy - oh / 2, px = cx - pw / 2, py = cy - ph / 2;
    let g = `<rect x="${ox}" y="${oy}" width="${ow}" height="${oh}" fill="${st.shade ? '#f6d9d3' : '#f2d28b'}" stroke="${st.shade ? R : '#b98a2a'}" stroke-width="2.5"/>`;
    g += `<rect x="${px}" y="${py}" width="${pw}" height="${ph}" fill="${st.shade ? '#f4f6f8' : '#dbe8f7'}" stroke="${C}" stroke-width="2"/>`;
    g += tx(cx, py + 22, '36 cm', 17, C, 600) + tx(px + 30, cy, '28 cm', 17, C, 600);
    g += st.shade ? tx(cx, cy + 10, '畫（不計）', 17, MUTED, 500) : tx(cx, cy + 10, '畫', 22, C, 700);
    if (st.xs) {
      const m = x * S / 2;
      g += `<g class="xs">${[[cx, oy + m], [cx, py + ph + m], [ox + m, cy - 40], [px + pw + m, cy - 40]].map(([a, b]) => tx(a, b + 1, 'x', 17, R, 700, 'middle', ' font-style="italic"')).join('')}</g>`;
    }
    const tick = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${HL}" stroke-width="2"/>`;
    if (st.dimW) {
      const y = oy - 22;
      g += `<path class="dim dw" d="M${ox} ${y} H${ox + ow}" stroke="${HL}" stroke-width="2.5" fill="none"/>${[ox, px, px + pw, ox + ow].map(v => tick(v, y - 7, v, y + 7)).join('')}`;
      g += tx(cx, y - 16, '36 + 2x', 18, HL, 700, 'middle', ' font-style="italic"');
    }
    if (st.dimH) {
      const xr = ox + ow + 22;
      g += `<path class="dim dh" d="M${xr} ${oy} V${oy + oh}" stroke="${HL}" stroke-width="2.5" fill="none"/>${[oy, py, py + ph, oy + oh].map(v => tick(xr - 7, v, xr + 7, v)).join('')}`;
      g += tx(xr + 12, cy, '28 + 2x', 18, HL, 700, 'start', ' font-style="italic"');
    }
    return `<svg viewBox="0 0 470 320" role="img" aria-label="畫貼在卡紙中央，四周等闊邊框">${g}</svg>`;
  }
  const frameP1 = h => stepPage(h, {
    keys: true,
    fig: s => s ? frameSVG(3, { xs: s >= 5 }) : '',
    items: [
      { k: '審', html: known('畫長 36 cm、闊 28 cm，貼在卡紙<b>中央</b>。') },
      { k: '審', html: known('四周邊框<b>等闊</b>。') },
      { k: '審', html: known('邊框面積 168 cm²（邊框 ＝ 卡紙減去畫）。') },
      { k: '審', html: find('邊框闊度。') },
      { k: '設', html: `設邊框闊度為 ${M('x')} cm；「等闊」即上、下、左、右都是 ${M('x')}。` }
    ],
    onStep: (s, h) => { if (s === 5) h.querySelectorAll('.xs text').forEach((t, i) => anim().popIn(t, i * 140)); }
  });
  function frameP2(h) {
    let x = 1;
    const area = v => (36 + 2 * v) * (28 + 2 * v) - 1008;
    const msg = () => { const a = area(x); return `邊框面積 ＝ <span class="count-num inline">${fmt2(a)}</span> cm²　` + (Math.abs(a - 168) < 0.5 ? `很接近 168：${M('x\\approx1.26')}。不是整數，要用<b>公式法</b>求準確值。` : a < 168 ? '太小，邊框要闊一點。' : '太大，邊框要窄一點。'); };
    stepPage(h, {
      fold: true, carry: `設邊框闊度為 ${M('x')} cm。`,
      fig: s => s === 5 ? frameSVG(x, { shade: true }) : frameSVG(3, { xs: true, dimW: s >= 1, dimH: s >= 2, shade: s >= 3 }),
      items: [
        { k: '表', html: eqLine('\\text{卡紙長}=x+36+x=36+2x') },
        { k: '表', html: eqLine('\\text{卡紙闊}=x+28+x=28+2x') },
        { k: '列', html: eqLine('\\text{邊框面積}=\\text{卡紙面積}-\\text{畫的面積}') },
        { k: '列', html: eqLine('(36+2x)(28+2x)-36\\times28=168', '<span class="lbl eq">方程</span>') },
        { html: `${tryLbl}<span class="ictrl inline"><label for="xRange">${M('x')}</label><input id="xRange" type="range" min="0" max="3" step="0.01" value="1"><span class="ival">1.00</span>${presetBtns([1, 1.5, 1.26], v => `x = ${v}`)}</span><div class="live-msg"></div>`, cls: 'live' }
      ],
      onStep: (s, h) => { if (s === 1) anim().lineDraw(h.querySelector('.dw')); if (s === 2) anim().lineDraw(h.querySelector('.dh')); },
      onReset: () => { x = 1; },
      live: (h, redraw, isLive) => {
        const range = h.querySelector('#xRange'), box = h.querySelector('.live-msg');
        const set = (v, count) => {
          const from = area(x); x = v; range.value = x; h.querySelector('.ival').textContent = fmt2(x);
          box.innerHTML = msg();
          if (count && anim()) anim().countUp(box.querySelector('.count-num'), from, area(x), fmt2);
          if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([box]).catch(() => {});
          if (isLive()) redraw();
        };
        range.oninput = () => set(+range.value, false);
        h.querySelectorAll('[data-v]').forEach(b => { b.onclick = () => set(+b.dataset.v, true); });
        h.querySelector('[data-a="reset"]').addEventListener('click', () => set(1, false));
        set(1, false);
      }
    });
  }
  const frameRows = [[
    { k: '設', h: `設邊框闊度為 ${M('x')} cm（${M('x>0')}）。` },
    { k: '表', h: `卡紙長 ${M('(36+2x)')} cm，闊 ${M('(28+2x)')} cm。` },
    { k: '列', l: '(36+2x)(28+2x)-36\\times28', r: '168' },
    { k: '解', l: '1008+128x+4x^2-1008', r: '168' },
    { l: '4x^2+128x-168', r: '0' },
    { l: 'x^2+32x-42', r: '0' }
  ], [
    { l: 'x', r: '\\dfrac{-32\\pm\\sqrt{32^2-4(1)(-42)}}{2(1)}' },
    { r: '\\dfrac{-32\\pm\\sqrt{1192}}{2}' },
    { r: '-16\\pm\\sqrt{298}' },
    { k: '驗', h: `${M('\\because x>0')}，${M('x=-16-\\sqrt{298}')} 不合，捨去；${M('x=\\sqrt{298}-16\\approx1.26')} ✓` },
    { k: '答', h: `邊框闊度為 ${M('(\\sqrt{298}-16)')} cm。`, cls: 'answer' }
  ]];
  const frameTrap = [`卡紙長寫成 ${M('36+x')}：<span class="hl">左右兩邊都有邊框</span>，要加 ${M('2x')}。`, `邊框面積不是 ${M('(36+2x)(28+2x)')}，要減去畫的面積。`];

  // ---------- E1.3(3) 例題1：靠牆圍繩 ----------
  const ropeQ = [`用一條長 ${qk('58 m')} 的繩圍出一個長方形範圍，其中一邊${qk('靠牆')}，該邊${qk('毋須用繩')}；${qk('牆足夠長')}。若圍成的面積是 ${qk('200 m²')}，求長方形兩個方向的邊長。`];
  function ropeSVG(x, st) {
    const S = 5, par = 58 - 2 * x, w = par * S, hgt = x * S, cx = 210, top = 48, L = cx - w / 2, Rr = cx + w / 2;
    let g = `<line x1="20" y1="${top}" x2="400" y2="${top}" stroke="${INK}" stroke-width="4"/>`;
    for (let i = 24; i < 400; i += 16) g += `<line x1="${i}" y1="${top - 2}" x2="${i + 10}" y2="${top - 14}" stroke="${MUTED}" stroke-width="1.5"/>`;
    g += tx(cx, top - 30, '牆（不用繩）', 15, MUTED, 600);
    g += `<rect x="${L}" y="${top}" width="${w}" height="${hgt}" fill="#e7eef9" stroke="none"/>`;
    g += `<path class="rope" d="M${L} ${top} V${top + hgt} H${Rr} V${top}" fill="none" stroke="${HL}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`;
    if (st.xs) g += `<g class="xs">${tx(L - 10, top + hgt / 2, st.live ? `${x}` : 'x', 18, R, 700, 'end', st.live ? '' : ' font-style="italic"')}${tx(Rr + 10, top + hgt / 2, st.live ? `${x}` : 'x', 18, R, 700, 'start', st.live ? '' : ' font-style="italic"')}</g>`;
    if (st.par) g += `<g class="par">${tx(cx, top + hgt + 20, st.live ? `${par}` : '58 − 2x', 18, C, 700, 'middle', st.live ? '' : ' font-style="italic"')}</g>`;
    if (st.live) g += tx(cx, top + hgt / 2 + 1, `${x * par}`, 16, C, 600);
    return `<svg viewBox="0 0 420 ${st.live ? 250 : 170}" role="img" aria-label="靠牆的長方形，三邊用繩">${g}</svg>`;
  }
  function ropeBar() {
    const x0 = 20, W = 400, u = W / 58, a = 12 * u;
    return `<svg class="rope-bar" viewBox="0 0 440 84" role="img" aria-label="58 m 的繩分成 x、58 − 2x、x 三段">
      ${tx(x0 + W / 2, 10, '繩長 58 m', 15, HL, 700)}
      <g class="pop seg"><rect x="${x0}" y="22" width="${a - 3}" height="34" rx="3" fill="#f6d9d3" stroke="${R}" stroke-width="2"/>${tx(x0 + a / 2, 39, 'x', 18, R, 700, 'middle', ' font-style="italic"')}</g>
      <g class="pop seg"><rect x="${x0 + a}" y="22" width="${W - 2 * a - 3}" height="34" rx="3" fill="#e7eef9" stroke="${C}" stroke-width="2"/>${tx(x0 + W / 2, 39, '58 − 2x', 18, C, 700, 'middle', ' font-style="italic"')}</g>
      <g class="pop seg"><rect x="${x0 + W - a}" y="22" width="${a}" height="34" rx="3" fill="#f6d9d3" stroke="${R}" stroke-width="2"/>${tx(x0 + W - a / 2, 39, 'x', 18, R, 700, 'middle', ' font-style="italic"')}</g>
      ${tx(x0 + a / 2, 72, '左邊', 13, MUTED)}${tx(x0 + W / 2, 72, '平行於牆的一邊', 13, MUTED)}${tx(x0 + W - a / 2, 72, '右邊', 13, MUTED)}
    </svg>`;
  }
  function areaGraph(x) {
    const X = v => 40 + v * 11.5, Y = v => 210 - v * 0.42, f = v => v * (58 - 2 * v);
    let d = '';
    for (let v = 0; v <= 29; v += 0.5) d += `${v ? 'L' : 'M'}${X(v).toFixed(1)} ${Y(f(v)).toFixed(1)}`;
    const hit = [4, 25].map(v => `<circle cx="${X(v)}" cy="${Y(200)}" r="5" fill="${x === v ? G : '#fff'}" stroke="${G}" stroke-width="2"/>`).join('');
    return `<svg viewBox="0 0 400 240" role="img" aria-label="面積 x(58 − 2x) 對 x 的圖像，面積 200 有兩個 x">
      <line x1="40" y1="210" x2="390" y2="210" stroke="${MUTED}" stroke-width="1.5"/><line x1="40" y1="20" x2="40" y2="210" stroke="${MUTED}" stroke-width="1.5"/>
      ${tx(388, 228, 'x', 15, MUTED, 600, 'end', ' font-style="italic"')}${tx(46, 14, '面積', 14, MUTED, 600, 'start')}
      ${[0, 10, 20, 29].map(v => tx(X(v), 224, v, 12, MUTED)).join('')}${tx(32, Y(200), '200', 12, G, 700, 'end')}
      <line x1="40" y1="${Y(200)}" x2="390" y2="${Y(200)}" stroke="${G}" stroke-width="2" stroke-dasharray="6 5"/>
      <path d="${d}" fill="none" stroke="${C}" stroke-width="3"/>${hit}
      <line x1="${X(x)}" y1="210" x2="${X(x)}" y2="${Y(f(x))}" stroke="${HL}" stroke-width="1.5" stroke-dasharray="3 4"/>
      <circle cx="${X(x)}" cy="${Y(f(x))}" r="7" fill="${HL}"/>
    </svg>`;
  }
  const ropeP1 = h => stepPage(h, {
    keys: true,
    fig: s => s ? ropeSVG(12, { xs: s >= 5 }) : '',
    items: [
      { k: '審', html: known('繩長 58 m，圍成長方形。') },
      { k: '審', html: known('一邊靠牆，該邊<b>不用繩</b>；牆足夠長。所以繩只圍<b>三邊</b>。') },
      { k: '審', html: known('面積 200 m²。') },
      { k: '審', html: find('長方形兩個方向的邊長。') },
      { k: '設', html: `設垂直於牆的邊長為 ${M('x')} m；兩條垂直於牆的邊都是 ${M('x')}。` }
    ],
    onStep: (s, h) => { if (s === 1) anim().lineDraw(h.querySelector('.rope')); if (s === 5) h.querySelectorAll('.xs text').forEach((t, i) => anim().popIn(t, i * 160)); }
  });
  function ropeP2(h) {
    let x = 10;
    stepPage(h, {
      fold: true, carry: `設垂直於牆的邊長為 ${M('x')} m。`, figCls: 'two',
      fig: s => s === 5 ? ropeSVG(x, { xs: true, par: true, live: true }) + areaGraph(x) : ropeSVG(12, { xs: true, par: s >= 2 }),
      items: [
        { k: '表', html: ropeBar() },
        { k: '表', html: eqLine('\\text{平行於牆的邊}=58-x-x=58-2x') },
        { k: '列', html: eqLine('\\text{面積}=\\text{長}\\times\\text{闊}') },
        { k: '列', html: eqLine('x(58-2x)=200', '<span class="lbl eq">方程</span>') },
        { html: `${tryLbl}<span class="ictrl inline"><label for="xRange">${M('x')}</label><input id="xRange" type="range" min="1" max="28" step="0.5" value="10"><span class="ival">10</span>${presetBtns([4, 25], v => `x = ${v}`)}</span><div class="live-msg"></div>`, cls: 'live' }
      ],
      onStep: (s, h) => { if (s === 1) h.querySelectorAll('.seg').forEach((g, i) => anim().popIn(g, i * 260)); if (s === 2) anim().popIn(h.querySelector('.par text')); },
      onReset: () => { x = 10; },
      live: (h, redraw, isLive) => {
        const range = h.querySelector('#xRange'), box = h.querySelector('.live-msg');
        const set = v => {
          x = v; range.value = x; h.querySelector('.ival').textContent = x;
          const a = x * (58 - 2 * x);
          box.innerHTML = `面積 ＝ ${x} × ${58 - 2 * x} ＝ <b>${a}</b> m²` + (a === 200 ? '　<span class="ok-tag">✓ 剛好 200</span>' : '') + '　<small>面積 200 有<b>兩個</b>位置：兩組都合題意嗎？</small>';
          if (isLive()) redraw();
        };
        range.oninput = () => set(+range.value);
        h.querySelectorAll('[data-v]').forEach(b => { b.onclick = () => { set(+b.dataset.v); if (anim()) anim().popIn(box.querySelector('.ok-tag')); }; });
        h.querySelector('[data-a="reset"]').addEventListener('click', () => set(10));
        set(10);
      }
    });
  }
  const ropeRows = [[
    { k: '設', h: `設垂直於牆的邊長為 ${M('x')} m。` },
    { k: '表', h: `平行於牆的邊長為 ${M('(58-2x)')} m。` },
    { k: '列', l: 'x(58-2x)', r: '200' },
    { k: '解', l: '58x-2x^2', r: '200' },
    { l: '2x^2-58x+200', r: '0' },
    { l: 'x^2-29x+100', r: '0' },
    { l: '(x-4)(x-25)', r: '0' },
    { h: `${M('x=4')} 或 ${M('x=25')}` }
  ], [
    { k: '驗', h: `${M('x=4')}：${M('58-2(4)=50>0')} ✓` },
    { h: `${M('x=25')}：${M('58-2(25)=8>0')} ✓` },
    { h: '牆足夠長，兩組答案都合題意。' },
    { k: '答', h: '兩邊長為 4 m 和 50 m，或 25 m 和 8 m。', cls: 'answer' }
  ]];
  const ropeTrap = [`把靠牆的一邊也算入繩長，寫成 ${M('2x+2y=58')}。`, '只寫一組答案：<span class="hl">兩組都合題意</span>，都要寫。'];

  // ---------- E1.3(4) 例題1：售價與利潤 ----------
  const profitQ = [`一款玩具每件${qk('成本 30 元')}，原售 ${qk('40 元')}時可售出 ${qk('600 件')}。每件${qk('加價 1 元')}，銷量便${qk('減少 10 件')}。商店希望${qk('總利潤為 10000 元')}，而且盡量採用${qk('較低售價')}。求每件售價。`];
  const pCells = cells => `<span class="pt-row">${cells.map(c => `<span>${c}</span>`).join('')}</span>`;
  const pNum = x => pCells([x, 40 + x, 10 + x, 600 - 10 * x, (10 + x) * (600 - 10 * x)]);
  const pHead = `<span class="pt-row pt-head">${['每件加價（元）', '售價（元）', '每件利潤（元）', '銷量（件）', '總利潤（元）'].map(c => `<span>${c}</span>`).join('')}</span>`;
  const profitP1 = h => stepPage(h, {
    keys: true,
    items: [
      { k: '審', html: known('每件成本 30 元；售 40 元時賣出 600 件。') },
      { k: '審', html: known('每件<b>加價 1 元</b>，銷量便<b>減少 10 件</b>。') },
      { k: '審', html: known('總利潤 10000 元，而且要<b>較低售價</b>。') },
      { k: '審', html: find('每件<b>售價</b>。') },
      { k: '設', html: `設每件加價 ${M('x')} 元。` },
      { k: '設', html: '<span class="aside">題目求售價，但銷量跟「加價」改變，所以設加價最容易表示其他量；最後要答售價。</span>' }
    ]
  });
  function profitP2(h) {
    let x = 0;
    const p = () => (10 + x) * (600 - 10 * x);
    stepPage(h, {
      fold: true, carry: `設每件加價 ${M('x')} 元。　每件利潤 ＝ 售價 − 成本；總利潤 ＝ 每件利潤 × 銷量`,
      items: [
        { k: '表', html: `<span class="pt">${pHead}${pNum(0)}</span>` },
        { k: '表', html: `<span class="pt">${pNum(1)}</span>` },
        { k: '表', html: `<span class="pt">${pNum(2)}</span>` },
        { k: '表', html: `<span class="pt pt-x">${pCells([M('x'), M('40+x'), M('10+x'), M('600-10x'), M('(10+x)(600-10x)')])}</span>` },
        { k: '列', html: eqLine('(10+x)(600-10x)=10000', '<span class="lbl eq">方程</span>') },
        { html: `${tryLbl}<span class="ictrl inline"><label for="xRange">${M('x')}</label><input id="xRange" type="range" min="0" max="60" step="1" value="0"><span class="ival">0</span>${presetBtns([10, 40], v => `x = ${v}`)}</span><span class="pt pt-live"></span><div class="live-msg"></div>`, cls: 'live' }
      ],
      onStep: (s, h) => { if (s === 4) anim().popIn(h.querySelector('.pt-x span')); },
      onReset: () => { x = 0; },
      live: h => {
        const range = h.querySelector('#xRange'), row = h.querySelector('.pt-live'), box = h.querySelector('.live-msg');
        const set = (v, count) => {
          const from = p(); x = v; range.value = x; h.querySelector('.ival').textContent = x;
          row.innerHTML = pCells([x, 40 + x, 10 + x, 600 - 10 * x, `<span class="count-num inline">${p()}</span>`]);
          row.classList.toggle('hit', p() === 10000);
          if (count && anim()) anim().countUp(row.querySelector('.count-num'), from, p());
          box.innerHTML = p() === 10000 ? `<span class="ok-tag">✓ 總利潤 10000 元</span>　售價 ${40 + x} 元。另一個加價也可以嗎？哪一個售價較低？` : `總利潤 ${p()} 元，目標 10000 元。`;
        };
        range.oninput = () => set(+range.value, false);
        h.querySelectorAll('[data-v]').forEach(b => { b.onclick = () => { set(+b.dataset.v, true); if (anim()) anim().popIn(box.querySelector('.ok-tag')); }; });
        h.querySelector('[data-a="reset"]').addEventListener('click', () => set(0, false));
        set(0, false);
      }
    });
  }
  const profitRows = [[
    { k: '設', h: `設每件加價 ${M('x')} 元。` },
    { k: '表', h: `每件利潤 ${M('(40+x-30)=(10+x)')} 元，銷量 ${M('(600-10x)')} 件。` },
    { k: '列', l: '(10+x)(600-10x)', r: '10000' },
    { k: '解', l: '6000+500x-10x^2', r: '10000' },
    { l: '10x^2-500x+4000', r: '0' },
    { l: 'x^2-50x+400', r: '0' },
    { l: '(x-10)(x-40)', r: '0' },
    { h: `${M('x=10')} 或 ${M('x=40')}` }
  ], [
    { k: '驗', h: `${M('x=10')}：售價 50 元，銷量 500 件 ✓` },
    { h: `${M('x=40')}：售價 80 元，銷量 200 件 ✓` },
    { h: '兩者總利潤都是 10000 元；題目要<b>較低售價</b>，取 50 元。' },
    { k: '答', h: '每件售價應為 50 元。', cls: 'answer' }
  ]];
  const profitTrap = ['用「售價 × 銷量」：那是總收入，不是總利潤。', `銷量寫成 ${M('600+10x')}：加價令銷量<span class="hl">減少</span>。`, '答「加價 10 元」：題目求的是<b>售價</b>。'];

  // ---------- slides ----------
  const SEC = 'E1.3 一元二次方程的應用';
  const page = (sec, title, tocTitle, points, visual) => ({ sec, secName: SEC, title, tocTitle, points, layout: 'question apps', visual, caption: '' });
  const ex = (sec, title, short, q, p1, p2, cols, trap) => [
    page(sec, title, `${short} · 審・設`, q, p1),
    page(sec, title, `${short} · 表・列`, q, p2),
    page(sec, title, `${short} · 解・驗・答`, q, h => worked(h, { cols, trap }))
  ];
  const slides = [
    page('步', '解應用題七步', '七步 · 審設表列解驗答', ['應用題的難處在於把<b>文字</b>變成<b>方程</b>。每一步都先問自己一個問題。'], sevenSteps),
    ...ex('1', 'E1.3(1)　例題 1', '(1) 例題1', intQ, intP1, intP2, intRows, intTrap),
    ...ex('2', 'E1.3(2)　例題 1', '(2) 例題1', triQ, triP1, triP2, triRows, triTrap),
    ...ex('2', 'E1.3(2)　例題 2', '(2) 例題2', frameQ, frameP1, frameP2, frameRows, frameTrap),
    ...ex('3', 'E1.3(3)　例題 1', '(3) 例題1', ropeQ, ropeP1, ropeP2, ropeRows, ropeTrap),
    ...ex('4', 'E1.3(4)　例題 1', '(4) 例題1', profitQ, profitP1, profitP2, profitRows, profitTrap)
  ];
  window.DECK.push({ ch: 1, title: '一元二次方程的應用', color: C, sections: ['步 解題七步', '1 整數', '2 長度與面積', '3 圍欄與牆', '4 售價與利潤'], slides });

  // 做一做：列式頁 + 解驗答頁。練習：一頁（原題不收起）＋逐行解題。
  const tryPages = (sec, title, short, q, p1, cols, trap) => [
    page(sec, title, `${short} · 列式`, q, p1),
    page(sec, title, `${short} · 解・驗・答`, q, h => worked(h, { cols, trap }))
  ];
  const practice = (sec, title, short, q, cfg) => page(sec, title, `${short} · 解題`, q, h => worked(h, { ...cfg, fold: false }));

  // Shared with the remaining-question files (e13-*.js); they insert their pages in worksheet order.
  window.AL = {
    C, R, HL, G, INK, MUTED, M, qk, tx, fmt2, anim, known, find, eqLine, presetBtns, tryLbl, cM, nbox, trRow, barModel,
    triSVG, frameSVG, ropeSVG, areaGraph, pCells, pHead, stepPage, worked, page, ex, tryPages, practice,
    insertAfter(tocTitle, pages) {
      const i = slides.findIndex(s => s.tocTitle === tocTitle);
      if (i < 0) throw new Error(`E1.3: no page "${tocTitle}"`);
      slides.splice(i + 1, 0, ...pages);
    }
  };
})();
