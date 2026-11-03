/* E1.3(2) 長度、面積與剪摺：做一做1–4、例題3–4、練習1–9（工作紙 p.12–13）。
   Answers: approved Answer_Key.md L202, L204–L217. Inserted in worksheet order. */
(function () {
  'use strict';
  const A = window.AL;
  if (!A) return;
  const { M, qk, tx, fmt2, C, R, HL, G, INK, MUTED, known, find, eqLine, presetBtns, tryLbl, cM, triSVG, stepPage, ex, tryPages, practice } = A;
  const S = '2', SEC = 'E1.3(2)';
  const eqLbl = '<span class="lbl eq">方程</span>';
  const pop = el => A.anim().popIn(el);

  // ---------- 做一做 1：直角三角形 PQR ----------
  const t1Q = [`在直角三角形 ${M('PQR')} 中，${qk(M('\\angle PQR=90^\\circ'))}，${qk(M('PQ=(22+k)'))} cm，${qk(M('QR=20'))} cm，${qk(M('PR=(26-3k)'))} cm。`, `(a) 求 ${M('k')}。　(b) 求三角形 ${M('PQR')} 的周界。`];
  const pqr = { ab: 26, bc: 20, S: 8, names: ['P', 'Q', 'R'], abLabel: '(22 + k) cm', bcLabel: '20 cm', acLabel: '(26 − 3k) cm' };
  const t1P1 = h => stepPage(h, {
    keys: true,
    fig: s => s ? triSVG({ ...pqr, ra: true, labels: s >= 2, hyp: s >= 4 }) : '',
    items: [
      { k: '審', html: known(`${M('\\angle PQR=90^\\circ')}：直角在 ${M('Q')}。`) },
      { k: '審', html: known(`三條邊都用 ${M('k')} 表示。`) },
      { k: '審', html: find(`(a) ${M('k')}；(b) 周界。`) },
      { k: '表', html: `直角在 ${M('Q')}，它的對邊 ${M('PR')} 是<b>斜邊</b>。` },
      { k: '列', html: `畢氏定理：${cM([[C, 'PQ^2'], ['', '+'], [G, 'QR^2'], ['', '='], [HL, 'PR^2']])}` },
      { k: '列', html: `<span class="eq-line">${eqLbl}<span class="eq-math">${cM([[C, '(22+k)^2'], ['', '+'], [G, '20^2'], ['', '='], [HL, '(26-3k)^2']])}</span></span>` }
    ],
    onStep: (s, h) => { if (s === 4) A.anim().lineDraw(h.querySelector('.ac-line')); }
  });
  const t1Rows = [[
    { k: '列', h: `${M('\\because \\angle PQR=90^\\circ')}，${M('PR')} 為斜邊。` },
    { l: 'PQ^2+QR^2', r: 'PR^2', note: '畢氏定理' },
    { l: '(22+k)^2+20^2', r: '(26-3k)^2' },
    { k: '解', l: '484+44k+k^2+400', r: '676-156k+9k^2' },
    { l: '8k^2-200k-208', r: '0' },
    { l: 'k^2-25k-26', r: '0' },
    { l: '(k-26)(k+1)', r: '0' },
    { h: `${M('k=26')} 或 ${M('k=-1')}` }
  ], [
    { k: '驗', h: `${M('k=26')}：${M('PR=26-78=-52<0')}，不合，捨去。` },
    { h: `${M('k=-1')}：${M('PQ=21')}，${M('QR=20')}，${M('PR=29')}，三邊皆正 ✓` },
    { k: '答', h: `(a) ${M('k=-1')}`, cls: 'answer' },
    { h: `(b) 周界 ${M('=21+20+29=70')} cm`, cls: 'answer' }
  ]];
  const t1Trap = [`捨去的是正數 ${M('k=26')}，因為 ${M('PR')} 變成負數。`, '周界是三邊之和，不是面積。'];

  // ---------- 做一做 2：泳池三邊通道 ----------
  const t2Q = [`一個長 ${qk('50 m')}、闊 ${qk('30 m')} 的長方形泳池，${qk('兩條短邊')}及${qk('其中一條長邊')}外圍鋪有等闊通道，另一條長邊外沒有通道。若${qk('通道面積共 700 m²')}，求通道闊度。`];
  function poolSVG(st) {
    const k = 3.4, xd = 20, px = 160, py = 46, pw = 30 * k, ph = 50 * k;
    const ox = px - xd, oy = py - xd, ow = pw + xd, oh = ph + 2 * xd;
    let g = `<rect x="${ox}" y="${oy}" width="${ow}" height="${oh}" fill="${st.shade ? '#f6d9d3' : '#fff'}" stroke="${INK}" stroke-width="2"/>`;
    g += `<rect x="${px}" y="${py}" width="${pw}" height="${ph}" fill="#cfe6f7" stroke="${C}" stroke-width="2"/>`;
    g += tx(px + pw / 2, py + 18, '30 m', 15, C, 600) + tx(px + pw + 12, py + ph / 2, '50 m', 15, C, 600, 'start');
    g += tx(px + pw + 12, py + ph / 2 + 22, '（這邊沒有通道）', 12, MUTED, 500, 'start');
    if (st.xs) g += `<g class="xs">${[[px + pw / 2, oy + xd / 2], [px + pw / 2, py + ph + xd / 2], [ox + xd / 2, py + ph / 2]].map(([a, b]) => tx(a, b + 1, 'x', 15, R, 700, 'middle', ' font-style="italic"')).join('')}</g>`;
    if (st.dimL) g += `<g class="dim-l">${tx(ox - 12, oy + oh / 2, '50 + 2x', 16, HL, 700, 'end', ' font-style="italic"')}</g>`;
    if (st.dimW) g += `<g class="dim-w">${tx(ox + ow / 2, oy - 12, '30 + x', 16, HL, 700, 'middle', ' font-style="italic"')}</g>`;
    return `<svg viewBox="0 0 420 270" role="img" aria-label="泳池兩短邊及一長邊外有等闊通道">${g}</svg>`;
  }
  const t2P1 = h => stepPage(h, {
    keys: true,
    fig: s => s ? poolSVG({ xs: s >= 4, dimL: s >= 5, dimW: s >= 6, shade: s >= 7 }) : '',
    items: [
      { k: '審', html: known('泳池長 50 m、闊 30 m。') },
      { k: '審', html: known('兩條<b>短邊</b>及<b>一條長邊</b>外有等闊通道；另一條長邊沒有。') },
      { k: '審', html: `${known('通道面積 700 m²。')}　${find('通道闊度。')}` },
      { k: '設', html: `設通道闊度為 ${M('x')} m。` },
      { k: '表', html: eqLine('\\text{外長}=50+2x', '<span class="aside">兩條短邊都有通道</span>') },
      { k: '表', html: eqLine('\\text{外闊}=30+x', '<span class="aside">只有一條長邊有通道</span>') },
      { k: '列', html: eqLine('(30+x)(50+2x)-30\\times50=700', eqLbl) }
    ],
    onStep: (s, h) => {
      if (s === 4) h.querySelectorAll('.xs text').forEach(pop);
      if (s === 5) pop(h.querySelector('.dim-l text'));
      if (s === 6) pop(h.querySelector('.dim-w text'));
    }
  });
  const t2Rows = [[
    { k: '設', h: `設通道闊度為 ${M('x')} m（${M('x>0')}）。` },
    { k: '表', h: `外圍長方形長 ${M('(50+2x)')} m，闊 ${M('(30+x)')} m。` },
    { k: '列', l: '(30+x)(50+2x)-30\\times50', r: '700' },
    { k: '解', l: '1500+110x+2x^2-1500', r: '700' },
    { l: '2x^2+110x-700', r: '0' },
    { l: 'x^2+55x-350', r: '0' }
  ], [
    { l: 'x', r: '\\dfrac{-55\\pm\\sqrt{55^2-4(1)(-350)}}{2(1)}' },
    { r: '\\dfrac{-55\\pm\\sqrt{4425}}{2}' },
    { r: '\\dfrac{-55\\pm5\\sqrt{177}}{2}' },
    { k: '驗', h: `${M('x>0')}，負根不合；${M('x=\\dfrac{5\\sqrt{177}-55}{2}\\approx5.76')} ✓` },
    { k: '答', h: `通道闊度為 ${M('\\dfrac{5\\sqrt{177}-55}{2}')} m（約 5.76 m）。`, cls: 'answer' }
  ]];
  const t2Trap = [`外闊只加 ${M('x')}：只有<span class="hl">一條</span>長邊有通道。`, `外長加 ${M('2x')}：兩條短邊都有通道。`];

  // ---------- 練習 1–3 ----------
  const p1Q = [`一個直角三角形的兩條直角邊分別長 ${M('(x-14)')} cm、${M('x')} cm，斜邊長 ${M('(x+2)')} cm。求三邊長。`];
  const p1Rows = [[
    { k: '列', l: '(x-14)^2+x^2', r: '(x+2)^2', note: '畢氏定理' },
    { k: '解', l: 'x^2-28x+196+x^2', r: 'x^2+4x+4' },
    { l: 'x^2-32x+192', r: '0' },
    { l: '(x-8)(x-24)', r: '0' },
    { h: `${M('x=8')} 或 ${M('x=24')}` }
  ], [
    { k: '驗', h: `${M('x=8')}：${M('x-14=-6<0')}，不合，捨去。` },
    { h: `${M('x=24')}：三邊 10、24、26，${M('10^2+24^2=26^2')} ✓` },
    { k: '答', h: '三邊長為 10 cm、24 cm、26 cm。', cls: 'answer' }
  ]];
  const p1Trap = [`檢驗要看<span class="hl">每一條邊</span>是否為正，包括 ${M('x-14')}。`];

  const p2Q = [`一條長 80 cm 的鐵線剪成兩段，每段各圍成一個正方形。設較長一段長 ${M('x')} cm。`, `(a) 用 ${M('x')} 表示兩個正方形的邊長。　(b) 若兩個正方形的面積和為 272 cm²，求 ${M('x')}。`];
  const p2Rows = [[
    { h: '<b>(a)</b>　兩段長 ' + M('x') + ' cm 及 ' + M('(80-x)') + ' cm。' },
    { k: '答', h: `邊長為 ${M('\\dfrac{x}{4}')} cm 及 ${M('\\dfrac{80-x}{4}')} cm。`, cls: 'answer' },
    { h: '<b>(b)</b>' },
    { k: '列', l: '\\left(\\dfrac{x}{4}\\right)^2+\\left(\\dfrac{80-x}{4}\\right)^2', r: '272' },
    { k: '解', l: 'x^2+(80-x)^2', r: '4352' },
    { l: '2x^2-160x+2048', r: '0' }
  ], [
    { l: 'x^2-80x+1024', r: '0' },
    { l: '(x-16)(x-64)', r: '0' },
    { h: `${M('x=16')} 或 ${M('x=64')}` },
    { k: '驗', h: `${M('x')} 是較長一段，須 ${M('x>40')}，${M('x=16')} 不合。` },
    { h: `${M('x=64')}：邊長 16 和 4，${M('256+16=272')} ✓` },
    { k: '答', h: `(b) ${M('x=64')}`, cls: 'answer' }
  ]];
  const p2Trap = ['正方形邊長是鐵線長的 <span class="hl">¼</span>。'];

  const p3Q = ['一張 26 cm × 16 cm 的長方形卡紙，四角各剪去一個邊長相等的小正方形，再摺成無蓋長方體盒。盒底面積為 200 cm²。', '(a) 求剪去的小正方形邊長。　(b) 求盒的容積。'];
  function cardSVG() {
    const k = 11, x0 = 60, y0 = 26, W = 26 * k, H = 16 * k, c = 3 * k;
    let g = `<rect x="${x0}" y="${y0}" width="${W}" height="${H}" fill="#f2d28b" stroke="${INK}" stroke-width="2"/>`;
    [[x0, y0], [x0 + W - c, y0], [x0, y0 + H - c], [x0 + W - c, y0 + H - c]].forEach(([a, b]) => { g += `<rect x="${a}" y="${b}" width="${c}" height="${c}" fill="#fff" stroke="${R}" stroke-width="2"/>${tx(a + c / 2, b + c / 2 + 1, 'x', 15, R, 700, 'middle', ' font-style="italic"')}`; });
    g += `<rect x="${x0 + c}" y="${y0 + c}" width="${W - 2 * c}" height="${H - 2 * c}" fill="none" stroke="${C}" stroke-width="2" stroke-dasharray="6 5"/>`;
    g += tx(x0 + W / 2, y0 + H / 2, '盒底', 16, C, 700) + tx(x0 + W / 2, y0 - 12, '26 cm', 15, INK, 600) + tx(x0 - 10, y0 + H / 2, '16 cm', 15, INK, 600, 'end');
    return `<svg viewBox="0 0 400 220" role="img" aria-label="卡紙四角各剪去邊長 x 的正方形">${g}</svg>`;
  }
  const p3Rows = [[
    { k: '設', h: `設小正方形邊長為 ${M('x')} cm。` },
    { k: '表', h: `盒底長 ${M('(26-2x)')} cm，闊 ${M('(16-2x)')} cm。` },
    { k: '列', l: '(26-2x)(16-2x)', r: '200' },
    { k: '解', l: '416-84x+4x^2', r: '200' },
    { l: 'x^2-21x+54', r: '0' },
    { l: '(x-3)(x-18)', r: '0' },
    { h: `${M('x=3')} 或 ${M('x=18')}` }
  ], [
    { k: '驗', h: `須 ${M('16-2x>0')}，即 ${M('0<x<8')}，${M('x=18')} 不合。` },
    { k: '答', h: '(a) 小正方形邊長為 3 cm。', cls: 'answer' },
    { h: '盒底 20 cm × 10 cm，盒高 3 cm。' },
    { k: '答', h: `(b) 容積 ${M('=200\\times3=600')} cm³`, cls: 'answer' }
  ]];
  const p3Trap = [`盒高就是剪去的小正方形邊長 ${M('x')}。`];

  // ---------- 例題 3：直角邊相差 4，面積 6 ----------
  const e3Q = [`一個直角三角形的兩條直角邊${qk('相差 4 cm')}，${qk('面積為 6 cm²')}。求兩條直角邊長。`];
  const legs = (x, live) => triSVG({ ab: x, bc: x + 4, S: live ? 34 : 40, noNames: true, fill: true, ra: true, labels: true, abLabel: live ? `${x}` : 'x cm', bcLabel: live ? `${x + 4}` : '(x + 4) cm', mid: '' });
  const e3P1 = h => stepPage(h, {
    keys: true,
    fig: s => s >= 4 ? legs(3) : s ? triSVG({ ab: 3, bc: 7, S: 40, noNames: true, fill: true, ra: true }) : '',
    items: [
      { k: '審', html: known('直角三角形的兩條<b>直角邊</b>相差 4 cm。') },
      { k: '審', html: known('面積為 6 cm²。') },
      { k: '審', html: find('兩條直角邊長。') },
      { k: '設', html: `設較短的直角邊為 ${M('x')} cm。` },
      { k: '設', html: `較長的直角邊為 ${M('(x+4)')} cm。` }
    ]
  });
  function e3P2(h) {
    let x = 3;
    stepPage(h, {
      fold: true, carry: `設較短的直角邊為 ${M('x')} cm，較長的為 ${M('(x+4)')} cm。`,
      fig: s => s === 4 ? legs(x, true) : legs(3),
      items: [
        { k: '表', html: '兩條直角邊互相垂直，可以當作三角形的<b>底</b>和<b>高</b>。' },
        { k: '列', html: eqLine('\\text{面積}=\\dfrac12\\times\\text{底}\\times\\text{高}') },
        { k: '列', html: eqLine('\\dfrac12x(x+4)=6', eqLbl) },
        { html: `${tryLbl}<span class="ictrl inline"><label for="xRange">${M('x')}</label><input id="xRange" type="range" min="0.5" max="5" step="0.5" value="3"><span class="ival">3</span>${presetBtns([1, 2, 4], v => `x = ${v}`)}</span><div class="live-msg"></div>`, cls: 'live' }
      ],
      onReset: () => { x = 3; },
      live: (h, redraw, isLive) => {
        const range = h.querySelector('#xRange'), box = h.querySelector('.live-msg');
        const set = v => {
          x = v; range.value = x; h.querySelector('.ival').textContent = x;
          const a = x * (x + 4) / 2;
          box.innerHTML = `面積 ＝ ½ × ${x} × ${x + 4} ＝ <b>${a}</b> cm²` + (a === 6 ? '　<span class="ok-tag">✓ 剛好 6</span>' : a < 6 ? '　太小' : '　太大');
          if (isLive()) redraw();
        };
        range.oninput = () => set(+range.value);
        h.querySelectorAll('[data-v]').forEach(b => { b.onclick = () => { set(+b.dataset.v); pop(box.querySelector('.ok-tag')); }; });
        h.querySelector('[data-a="reset"]').addEventListener('click', () => set(3));
        set(3);
      }
    });
  }
  const e3Rows = [[
    { k: '設', h: `設較短的直角邊為 ${M('x')} cm，則較長的為 ${M('(x+4)')} cm。` },
    { k: '列', l: '\\dfrac12x(x+4)', r: '6' },
    { k: '解', l: 'x^2+4x', r: '12' },
    { l: 'x^2+4x-12', r: '0' },
    { l: '(x+6)(x-2)', r: '0' },
    { h: `${M('x=2')} 或 ${M('x=-6')}` }
  ], [
    { k: '驗', h: `${M('x>0')}，${M('x=-6')} 不合，捨去。` },
    { h: `${M('x=2')}：兩邊 2 和 6，${M('\\dfrac12\\times2\\times6=6')} ✓` },
    { k: '答', h: '兩條直角邊長 2 cm 和 6 cm。', cls: 'answer' }
  ]];
  const e3Trap = [`三角形面積要乘 <span class="hl">½</span>；${M('x(x+4)=6')} 是長方形的面積。`];

  // ---------- 做一做 3 ----------
  const t3Q = ['(a) 一個直角三角形的兩條直角邊之和為 14 cm，面積為 24 cm²。求兩條直角邊長。', '(b) 一個長方形的長比闊多 1 cm，面積為 132 cm²。求它的長和闊。'];
  const t3P1 = h => stepPage(h, {
    items: [
      { k: '審', html: `<b>(a)</b>　${known('兩條直角邊之和 14 cm；面積 24 cm²。')}` },
      { k: '設', html: `設一條直角邊為 ${M('x')} cm，另一條為 ${M('(14-x)')} cm。` },
      { k: '列', html: eqLine('\\dfrac12x(14-x)=24', eqLbl) },
      { k: '審', html: `<b>(b)</b>　${known('長比闊多 1 cm；面積 132 cm²。')}` },
      { k: '設', html: `設闊為 ${M('w')} cm，長為 ${M('(w+1)')} cm。` },
      { k: '列', html: eqLine('w(w+1)=132', eqLbl) }
    ]
  });
  const t3Rows = [[
    { h: '<b>(a)</b>' },
    { k: '列', l: '\\dfrac12x(14-x)', r: '24' },
    { k: '解', l: 'x^2-14x+48', r: '0' },
    { l: '(x-6)(x-8)', r: '0' },
    { h: `${M('x=6')} 或 ${M('x=8')}` },
    { k: '驗', h: `${M('x=6')} 時另一邊 8；${M('x=8')} 時另一邊 6：同一個三角形。` },
    { k: '答', h: '兩條直角邊長 6 cm 和 8 cm。', cls: 'answer' }
  ], [
    { h: '<b>(b)</b>' },
    { k: '列', l: 'w(w+1)', r: '132' },
    { k: '解', l: 'w^2+w-132', r: '0' },
    { l: '(w+12)(w-11)', r: '0' },
    { h: `${M('w=11')} 或 ${M('w=-12')}` },
    { k: '驗', h: `${M('w>0')}，${M('w=-12')} 不合，捨去。` },
    { k: '答', h: '長 12 cm，闊 11 cm。', cls: 'answer' }
  ]];
  const t3Trap = ['(a) 兩個根給出<span class="hl">同一對</span>邊長，不是兩個答案。'];

  // ---------- 例題 4：相似圖案 ----------
  const e4Q = [`一本書的長方形封面高 ${qk('27 cm')}、闊 ${qk('21 cm')}。中央的長方形圖案與封面${qk('相似')}，方向相同，面積是封面的 ${qk(M('\\dfrac34'))}。圖案置中，${qk('上下邊框等闊')}，${qk('左右邊框也等闊')}。`, '(a) 求上下邊框各自的闊度。　(b) 求左右邊框各自的闊度。'];
  function coverSVG(r, st) {
    const k = 8, W = 21 * k, H = 27 * k, x0 = 120, y0 = 26, w = W * r, hh = H * r, px = x0 + (W - w) / 2, py = y0 + (H - hh) / 2;
    let g = `<rect x="${x0}" y="${y0}" width="${W}" height="${H}" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`;
    if (st.borders) {
      g += `<rect x="${x0}" y="${y0}" width="${W}" height="${py - y0}" fill="#fbe7c8"/><rect x="${x0}" y="${py + hh}" width="${W}" height="${py - y0}" fill="#fbe7c8"/>`;
      g += `<rect x="${x0}" y="${py}" width="${px - x0}" height="${hh}" fill="#ece5fb"/><rect x="${px + w}" y="${py}" width="${px - x0}" height="${hh}" fill="#ece5fb"/>`;
    }
    if (st.pattern) g += `<rect class="pat" x="${px}" y="${py}" width="${w}" height="${hh}" fill="#dbe8f7" stroke="${C}" stroke-width="2"/>${tx(x0 + W / 2, y0 + H / 2, '圖案', 18, C, 700)}`;
    g += tx(x0 + W / 2, y0 - 12, '21 cm', 15, INK, 600) + tx(x0 - 10, y0 + H / 2, '27 cm', 15, INK, 600, 'end');
    if (st.dims) g += tx(px + w / 2, py + hh - 14, '21r', 16, C, 700, 'middle', ' font-style="italic"') + tx(px + 22, y0 + H / 2 + 26, '27r', 16, C, 700, 'middle', ' font-style="italic"');
    if (st.borders) g += tx(x0 + W + 14, y0 + (py - y0) / 2, '上下邊框', 14, HL, 700, 'start') + tx(x0 + W + 14, y0 + H / 2, '左右邊框', 14, '#6d4acf', 700, 'start');
    return `<svg viewBox="0 0 420 260" role="img" aria-label="封面中央有相似的長方形圖案">${g}</svg>`;
  }
  const e4P1 = h => stepPage(h, {
    keys: true,
    fig: s => s ? coverSVG(0.866, { pattern: s >= 2, borders: s >= 3 }) : '',
    items: [
      { k: '審', html: known('封面高 27 cm、闊 21 cm。') },
      { k: '審', html: known(`圖案與封面<b>相似</b>、方向相同；面積是封面的 ${M('\\dfrac34')}。`) },
      { k: '審', html: known('上下邊框等闊，左右邊框也等闊（兩者不一定相同）。') },
      { k: '審', html: find('(a) 上下邊框闊度；(b) 左右邊框闊度。') },
      { k: '設', html: `設圖案與封面的相似比（邊長比）為 ${M('r')}（${M('0<r<1')}）。` }
    ],
    onStep: (s, h) => { if (s === 2) pop(h.querySelector('.pat')); }
  });
  function e4P2(h) {
    let r = 0.8;
    stepPage(h, {
      fold: true, carry: `設圖案與封面的相似比為 ${M('r')}。`,
      fig: s => coverSVG(s === 5 ? r : 0.866, { pattern: true, dims: s >= 1 && s < 5, borders: s >= 4 }),
      items: [
        { k: '表', html: `相似：每條邊都乘 ${M('r')}，圖案高 ${M('27r')} cm，闊 ${M('21r')} cm。` },
        { k: '列', html: eqLine('\\text{圖案面積}=\\dfrac34\\times\\text{封面面積}') },
        { k: '列', html: eqLine('(27r)(21r)=\\dfrac34\\times27\\times21', eqLbl) },
        { k: '表', html: `上下邊框 ${M('=\\dfrac{27-27r}{2}')}；左右邊框 ${M('=\\dfrac{21-21r}{2}')}` },
        { html: `${tryLbl}<span class="ictrl inline"><label for="rRange">${M('r')}</label><input id="rRange" type="range" min="0.5" max="0.98" step="0.01" value="0.8"><span class="ival">0.80</span>${presetBtns([0.75, 0.87, 0.9], v => `r = ${v}`)}</span><div class="live-msg"></div>`, cls: 'live' }
      ],
      onReset: () => { r = 0.8; },
      live: (h, redraw, isLive) => {
        const range = h.querySelector('#rRange'), box = h.querySelector('.live-msg');
        const set = v => {
          r = v; range.value = r; h.querySelector('.ival').textContent = fmt2(r);
          const pct = Math.round(r * r * 1000) / 10;
          box.innerHTML = `邊長是封面的 ${Math.round(r * 100)}%，面積是封面的 <b>${pct}%</b>` + (Math.abs(pct - 75) < 1 ? '　<span class="ok-tag">✓ 約 ¾</span>　面積比 ＝ 邊長比²' : '');
          if (isLive()) redraw();
        };
        range.oninput = () => set(+range.value);
        h.querySelectorAll('[data-v]').forEach(b => { b.onclick = () => { set(+b.dataset.v); pop(box.querySelector('.ok-tag')); }; });
        h.querySelector('[data-a="reset"]').addEventListener('click', () => set(0.8));
        set(0.8);
      }
    });
  }
  const e4Rows = [[
    { k: '設', h: `設圖案與封面的相似比為 ${M('r')}（${M('0<r<1')}）。` },
    { k: '表', h: `圖案高 ${M('27r')} cm，闊 ${M('21r')} cm。` },
    { k: '列', l: '(27r)(21r)', r: '\\dfrac34\\times27\\times21' },
    { k: '解', l: 'r^2', r: '\\dfrac34' },
    { l: 'r', r: '\\pm\\dfrac{\\sqrt3}{2}' },
    { k: '驗', h: `${M('r>0')}，負根不合；${M('r=\\dfrac{\\sqrt3}{2}\\approx0.87')} ✓` }
  ], [
    { h: `圖案高 ${M('\\dfrac{27\\sqrt3}{2}')} cm，闊 ${M('\\dfrac{21\\sqrt3}{2}')} cm。` },
    { k: '答', h: `(a) 上下邊框 ${M('=\\dfrac12\\left(27-\\dfrac{27\\sqrt3}{2}\\right)=\\dfrac{27(2-\\sqrt3)}{4}')} cm（約 1.81 cm）`, cls: 'answer' },
    { h: `(b) 左右邊框 ${M('=\\dfrac12\\left(21-\\dfrac{21\\sqrt3}{2}\\right)=\\dfrac{21(2-\\sqrt3)}{4}')} cm（約 1.41 cm）`, cls: 'answer' }
  ]];
  const e4Trap = [`設四邊邊框同闊 ${M('x')}：圖案就<span class="hl">不再相似</span>。`, `${M('\\dfrac34')} 是面積比；邊長比是 ${M('\\dfrac{\\sqrt3}{2}')}。`];

  // ---------- 做一做 4：空地中央水池 ----------
  const t4Q = [`一塊 ${qk('36 m × 24 m')} 的長方形空地，中央建長方形水池，四周留下${qk('等闊通道')}。水池面積是整塊空地面積的 ${qk(M('\\dfrac{5}{27}'))}。求通道闊度。`];
  function lotSVG(st) {
    const k = 7, W = 36 * k, H = 24 * k, x0 = 80, y0 = 30, xd = 6 * k;
    let g = `<rect x="${x0}" y="${y0}" width="${W}" height="${H}" fill="#e4efdc" stroke="${INK}" stroke-width="2"/>`;
    g += `<rect x="${x0 + xd}" y="${y0 + xd}" width="${W - 2 * xd}" height="${H - 2 * xd}" fill="#cfe6f7" stroke="${C}" stroke-width="2"/>${tx(x0 + W / 2, y0 + H / 2 - (st.dims ? 12 : 0), '水池', 17, C, 700)}`;
    g += tx(x0 + W / 2, y0 - 12, '36 m', 15, INK, 600) + tx(x0 - 10, y0 + H / 2, '24 m', 15, INK, 600, 'end');
    if (st.xs) g += `<g class="xs">${[[x0 + W / 2, y0 + xd / 2], [x0 + W / 2, y0 + H - xd / 2], [x0 + xd / 2, y0 + H / 2], [x0 + W - xd / 2, y0 + H / 2]].map(([a, b]) => tx(a, b + 1, 'x', 15, R, 700, 'middle', ' font-style="italic"')).join('')}</g>`;
    if (st.dims) g += tx(x0 + W / 2, y0 + H / 2 + 14, '(36 − 2x) × (24 − 2x)', 15, HL, 700, 'middle', ' font-style="italic"');
    return `<svg viewBox="0 0 420 230" role="img" aria-label="空地中央水池，四周等闊通道">${g}</svg>`;
  }
  const t4P1 = h => stepPage(h, {
    keys: true,
    fig: s => s ? lotSVG({ xs: s >= 3, dims: s >= 4 }) : '',
    items: [
      { k: '審', html: known('空地 36 m × 24 m；水池在中央，四周通道等闊。') },
      { k: '審', html: `${known(`水池面積是空地的 ${M('\\dfrac{5}{27}')}。`)}　${find('通道闊度。')}` },
      { k: '設', html: `設通道闊度為 ${M('x')} m。` },
      { k: '表', html: `水池長 ${M('(36-2x)')} m，闊 ${M('(24-2x)')} m。` },
      { k: '列', html: eqLine('\\text{水池面積}=\\dfrac{5}{27}\\times36\\times24=160') },
      { k: '列', html: eqLine('(36-2x)(24-2x)=160', eqLbl) }
    ],
    onStep: (s, h) => { if (s === 3) h.querySelectorAll('.xs text').forEach(pop); }
  });
  const t4Rows = [[
    { k: '設', h: `設通道闊度為 ${M('x')} m（${M('0<x<12')}）。` },
    { k: '表', h: `水池長 ${M('(36-2x)')} m，闊 ${M('(24-2x)')} m。` },
    { k: '列', l: '(36-2x)(24-2x)', r: '\\dfrac{5}{27}\\times36\\times24' },
    { r: '160' },
    { k: '解', l: '864-120x+4x^2', r: '160' },
    { l: 'x^2-30x+176', r: '0' }
  ], [
    { l: '(x-8)(x-22)', r: '0' },
    { h: `${M('x=8')} 或 ${M('x=22')}` },
    { k: '驗', h: `須 ${M('24-2x>0')}，即 ${M('x<12')}，${M('x=22')} 不合。` },
    { h: `${M('x=8')}：水池 20 m × 8 m ＝ 160 m² ✓` },
    { k: '答', h: '通道闊度為 8 m。', cls: 'answer' }
  ]];
  const t4Trap = [`通道在四周，長和闊都要<span class="hl">減 ${M('2x')}</span>。`];

  // ---------- 練習 4–9 ----------
  const p4Q = ['一條長 20 cm 的鐵線剪成兩段，各圍成一個正方形。', '(a) 若面積和為 17 cm²，求兩段鐵線長。　(b) 面積和可否為 12 cm²？說明理由。'];
  const p4Rows = [[
    { h: '<b>(a)</b>' },
    { k: '設', h: `設其中一段長 ${M('t')} cm，另一段長 ${M('(20-t)')} cm。` },
    { k: '列', l: '\\left(\\dfrac t4\\right)^2+\\left(\\dfrac{20-t}{4}\\right)^2', r: '17' },
    { k: '解', l: 't^2+(20-t)^2', r: '272' },
    { l: 't^2-20t+64', r: '0' },
    { l: '(t-4)(t-16)', r: '0' },
    { k: '答', h: `${M('t=4')} 或 ${M('16')}：兩段長 4 cm 和 16 cm。`, cls: 'answer' }
  ], [
    { h: '<b>(b)</b>' },
    { k: '列', l: 't^2+(20-t)^2', r: '12\\times16=192' },
    { k: '解', l: 't^2-20t+104', r: '0' },
    { l: '\\Delta', r: '(-20)^2-4(1)(104)' },
    { r: '-16<0' },
    { k: '驗', h: '方程沒有實根。' },
    { k: '答', h: '(b) 不可以，面積和不能是 12 cm²。', cls: 'answer' }
  ]];
  const p4Trap = [`兩段長之和是 20，所以只需<span class="hl">一個</span>未知數 ${M('t')}。`];

  const p5Q = ['一塊長方形地的長比闊多 10 m，面積為 200 m²。求長和闊。'];
  const p5Rows = [[
    { k: '設', h: `設闊為 ${M('w')} m，則長為 ${M('(w+10)')} m。` },
    { k: '列', l: 'w(w+10)', r: '200' },
    { k: '解', l: 'w^2+10w-200', r: '0' },
    { l: '(w+20)(w-10)', r: '0' },
    { h: `${M('w=10')} 或 ${M('w=-20')}` }
  ], [
    { k: '驗', h: `${M('w>0')}，${M('w=-20')} 不合，捨去。` },
    { k: '答', h: '長 20 m，闊 10 m。', cls: 'answer' }
  ]];
  const p5Trap = ['只答「闊 10 m」：題目要<span class="hl">長和闊</span>。'];

  const p6Q = ['一塊長方形田地的長比闊多 6 m。在田地四周外圍修建闊 3 m 的通道，通道面積等於田地面積。求田地的長和闊。'];
  const p6Rows = [[
    { k: '設', h: `設田地闊 ${M('w')} m，則長 ${M('(w+6)')} m。` },
    { k: '表', h: `連通道的長方形長 ${M('(w+12)')} m，闊 ${M('(w+6)')} m。` },
    { k: '列', l: '(w+12)(w+6)-w(w+6)', r: 'w(w+6)' },
    { k: '解', l: '(w+12)(w+6)', r: '2w(w+6)' },
    { l: 'w^2+18w+72', r: '2w^2+12w' },
    { l: 'w^2-6w-72', r: '0' }
  ], [
    { l: '(w-12)(w+6)', r: '0' },
    { h: `${M('w=12')} 或 ${M('w=-6')}` },
    { k: '驗', h: `${M('w>0')}，${M('w=-6')} 不合；田地 216 m²，外圍 ${M('24\\times18=432')}，通道 216 m² ✓` },
    { k: '答', h: '田地長 18 m，闊 12 m。', cls: 'answer' }
  ]];
  const p6Trap = ['通道闊 3 m 在四周，長和闊都要加 <span class="hl">2 × 3 ＝ 6 m</span>。'];

  const p7Q = ['一幅 80 cm × 50 cm 的畫，在四周外圍加上等闊邊框後，總面積為 5400 cm²。求邊框闊度。'];
  const p7Rows = [[
    { k: '設', h: `設邊框闊度為 ${M('x')} cm（${M('x>0')}）。` },
    { k: '表', h: `連邊框長 ${M('(80+2x)')} cm，闊 ${M('(50+2x)')} cm。` },
    { k: '列', l: '(80+2x)(50+2x)', r: '5400' },
    { k: '解', l: '4000+260x+4x^2', r: '5400' },
    { l: 'x^2+65x-350', r: '0' }
  ], [
    { l: '(x+70)(x-5)', r: '0' },
    { h: `${M('x=5')} 或 ${M('x=-70')}` },
    { k: '驗', h: `${M('x>0')}，${M('x=-70')} 不合；${M('90\\times60=5400')} ✓` },
    { k: '答', h: '邊框闊度為 5 cm。', cls: 'answer' }
  ]];
  const p7Trap = ['5400 cm² 是<span class="hl">總面積</span>，不是邊框面積。'];

  const p8Q = [`一個 60 m × 40 m 的長方形花園，沿內側四周留等闊通道，其餘種花。設通道闊度為 ${M('a')} m。`, `(a) 用 ${M('a')} 表示種花面積。　(b) 若通道面積是花園總面積的 ${M('\\dfrac38')}，求通道闊度。`];
  const p8Rows = [[
    { h: '<b>(a)</b>' },
    { k: '表', h: `種花區長 ${M('(60-2a)')} m，闊 ${M('(40-2a)')} m。` },
    { k: '答', h: `(a) 種花面積 ${M('(60-2a)(40-2a)')} m²`, cls: 'answer' },
    { h: '<b>(b)</b>' },
    { k: '表', h: `通道 ${M('\\dfrac38\\times2400=900')} m²，種花 ${M('2400-900=1500')} m²。` },
    { k: '列', l: '(60-2a)(40-2a)', r: '1500' }
  ], [
    { k: '解', l: '2400-200a+4a^2', r: '1500' },
    { l: 'a^2-50a+225', r: '0' },
    { l: '(a-5)(a-45)', r: '0' },
    { h: `${M('a=5')} 或 ${M('a=45')}` },
    { k: '驗', h: `須 ${M('40-2a>0')}，即 ${M('0<a<20')}，${M('a=45')} 不合。` },
    { k: '答', h: '(b) 通道闊度為 5 m。', cls: 'answer' }
  ]];
  const p8Trap = [`通道佔 ${M('\\dfrac38')}，種花區佔 ${M('\\dfrac58')}：右邊是 <span class="hl">1500</span>，不是 900。`];

  const p9Q = ['一張長方形鐵皮，四角各剪去一個邊長 1 m 的正方形，摺成無蓋長方體盒。盒的容積為 15 m³，盒底長比闊多 2 m。', '(a) 求原鐵皮的長和闊。　(b) 若鐵皮每平方米售 20 元，求原鐵皮的成本。'];
  const p9Rows = [[
    { k: '設', h: `設盒底闊為 ${M('w')} m，則長為 ${M('(w+2)')} m；盒高 1 m。` },
    { k: '列', l: 'w(w+2)\\times1', r: '15' },
    { k: '解', l: 'w^2+2w-15', r: '0' },
    { l: '(w+5)(w-3)', r: '0' },
    { h: `${M('w=3')} 或 ${M('w=-5')}` }
  ], [
    { k: '驗', h: `${M('w>0')}，${M('w=-5')} 不合；盒底 5 m × 3 m ✓` },
    { k: '答', h: '(a) 原鐵皮長 5 + 2 ＝ 7 m，闊 3 + 2 ＝ 5 m。', cls: 'answer' },
    { k: '答', h: `(b) ${M('7\\times5=35')} m²，成本 ${M('35\\times20=700')} 元。`, cls: 'answer' }
  ]];
  const p9Trap = ['盒底是剪角後的部分：原鐵皮長和闊都要<span class="hl">加 2 m</span>。'];

  A.insertAfter('(2) 例題1 · 解・驗・答', tryPages(S, `${SEC}　做一做 1`, '(2) 做一做1', t1Q, t1P1, t1Rows, t1Trap));
  A.insertAfter('(2) 例題2 · 解・驗・答', [
    ...tryPages(S, `${SEC}　做一做 2`, '(2) 做一做2', t2Q, t2P1, t2Rows, t2Trap),
    practice(S, `${SEC}　練習 1`, '(2) 練習1', p1Q, { cols: p1Rows, trap: p1Trap }),
    practice(S, `${SEC}　練習 2`, '(2) 練習2', p2Q, { cols: p2Rows, trap: p2Trap }),
    practice(S, `${SEC}　練習 3`, '(2) 練習3', p3Q, { cols: p3Rows, trap: p3Trap, figHTML: cardSVG() }),
    ...ex(S, `${SEC}　例題 3`, '(2) 例題3', e3Q, e3P1, e3P2, e3Rows, e3Trap),
    ...tryPages(S, `${SEC}　做一做 3`, '(2) 做一做3', t3Q, t3P1, t3Rows, t3Trap),
    ...ex(S, `${SEC}　例題 4`, '(2) 例題4', e4Q, e4P1, e4P2, e4Rows, e4Trap),
    ...tryPages(S, `${SEC}　做一做 4`, '(2) 做一做4', t4Q, t4P1, t4Rows, t4Trap),
    practice(S, `${SEC}　練習 4`, '(2) 練習4', p4Q, { cols: p4Rows, trap: p4Trap }),
    practice(S, `${SEC}　練習 5`, '(2) 練習5', p5Q, { cols: p5Rows, trap: p5Trap }),
    practice(S, `${SEC}　練習 6`, '(2) 練習6', p6Q, { cols: p6Rows, trap: p6Trap }),
    practice(S, `${SEC}　練習 7`, '(2) 練習7', p7Q, { cols: p7Rows, trap: p7Trap }),
    practice(S, `${SEC}　練習 8`, '(2) 練習8', p8Q, { cols: p8Rows, trap: p8Trap }),
    practice(S, `${SEC}　練習 9`, '(2) 練習9', p9Q, { cols: p9Rows, trap: p9Trap })
  ]);
})();
