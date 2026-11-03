/* E1.3(3) 圍欄、牆與門：做一做1、練習1–3（工作紙 p.14）。
   Answers: approved Answer_Key.md L402–L405 (that file numbers this section E1.3(4)). Inserted after (3) 例題1. */
(function () {
  'use strict';
  const A = window.AL;
  if (!A) return;
  const { M, qk, tx, C, R, HL, INK, MUTED, known, find, eqLine, stepPage, tryPages, practice } = A;
  const S = '3', SEC = 'E1.3(3)';
  const eqLbl = '<span class="lbl eq">方程</span>';

  // ---------- 做一做 1：牆 12 m，門口 1 m ----------
  const t1Q = [`用 ${qk('25 m 圍欄')}及一幅${qk('長 12 m 的直牆')}圍成長方形，其中一邊靠牆；在一條垂直牆的邊留 ${qk('1 m 闊的門口')}，${qk('門口不用圍欄')}。若${qk('面積為 80 m²')}，求長方形兩個方向的邊長。`];
  function doorSVG(st) {
    const k = 14, u = 8 * k, v = 10 * k, x0 = 120, y0 = 48, wall = 12 * k, door = 1 * k;
    let g = `<line x1="${x0}" y1="${y0}" x2="${x0 + wall}" y2="${y0}" stroke="${INK}" stroke-width="4"/>`;
    for (let i = x0 + 4; i < x0 + wall; i += 14) g += `<line x1="${i}" y1="${y0 - 2}" x2="${i + 9}" y2="${y0 - 12}" stroke="${MUTED}" stroke-width="1.5"/>`;
    g += tx(x0 + wall / 2, y0 - 26, '牆長 12 m', 14, MUTED, 600);
    g += `<rect x="${x0}" y="${y0}" width="${v}" height="${u}" fill="#e7eef9"/>`;
    g += `<path class="fence" d="M${x0} ${y0} V${y0 + u - door} M${x0} ${y0 + u} H${x0 + v} V${y0}" fill="none" stroke="${HL}" stroke-width="5" stroke-linecap="round"/>`;
    g += `<g class="door">${tx(x0 - 8, y0 + u - door / 2, '門口 1 m', 13, R, 700, 'end')}</g>`;
    if (st.labels) g += `<g class="lab">${tx(x0 + v + 10, y0 + u / 2, 'u', 17, R, 700, 'start', ' font-style="italic"')}${tx(x0 - 10, y0 + u / 2 - 14, 'u', 17, R, 700, 'end', ' font-style="italic"')}${tx(x0 + v / 2, y0 + u + 20, st.v ? '26 − 2u' : 'v', 17, C, 700, 'middle', ' font-style="italic"')}</g>`;
    return `<svg viewBox="0 0 420 210" role="img" aria-label="靠牆長方形，一條垂直牆的邊有 1 m 門口">${g}</svg>`;
  }
  const t1P1 = h => stepPage(h, {
    keys: true,
    fig: s => s ? doorSVG({ labels: s >= 4, v: s >= 5 }) : '',
    items: [
      { k: '審', html: known('圍欄 25 m；直牆長 12 m，一邊靠牆。') },
      { k: '審', html: known('一條垂直牆的邊留 1 m 門口，門口<b>不用圍欄</b>。') },
      { k: '審', html: `${known('面積 80 m²。')}　${find('兩個方向的邊長。')}` },
      { k: '設', html: `設垂直於牆的邊長為 ${M('u')} m。` },
      { k: '表', html: `圍欄：${M('u+u+v-1=25')}，沿牆的邊 ${M('v=26-2u')}` },
      { k: '列', html: eqLine('u(26-2u)=80', eqLbl) }
    ],
    onStep: (s, h) => {
      if (s === 1) A.anim().lineDraw(h.querySelector('.fence'));
      if (s === 2) A.anim().popIn(h.querySelector('.door text'));
    }
  });
  const t1Rows = [[
    { k: '設', h: `設垂直於牆的邊長為 ${M('u')} m。` },
    { k: '表', h: `圍欄 ${M('2u+v-1=25')}，沿牆的邊 ${M('v=(26-2u)')} m。` },
    { k: '列', l: 'u(26-2u)', r: '80' },
    { k: '解', l: '2u^2-26u+80', r: '0' },
    { l: 'u^2-13u+40', r: '0' },
    { l: '(u-5)(u-8)', r: '0' },
    { h: `${M('u=5')} 或 ${M('u=8')}` }
  ], [
    { k: '驗', h: `${M('u=5')}：沿牆的邊 16 m，比牆長 12 m 長，不合。` },
    { h: `${M('u=8')}：沿牆的邊 10 m ${M('\\le12')} ✓` },
    { k: '答', h: '垂直於牆的邊長 8 m，沿牆的邊長 10 m。', cls: 'answer' }
  ]];
  const t1Trap = ['門口不用圍欄：圍欄長要<span class="hl">減 1</span>。', '沿牆的邊不能比牆長。'];

  // ---------- 練習 1：牆長 a ----------
  const p1Q = [`一幅直牆長 ${M('a')} m（${M('a>0')}）。用 35 m 圍欄圍出面積 150 m² 的長方形，其中一邊靠牆，另外三邊用圍欄。按 ${M('a')} 的不同範圍，列出所有可行尺寸。`];
  const p1Rows = [[
    { k: '設', h: `設垂直於牆的邊長為 ${M('u')} m，則沿牆的邊長為 ${M('(35-2u)')} m。` },
    { k: '列', l: 'u(35-2u)', r: '150' },
    { k: '解', l: '2u^2-35u+150', r: '0' },
    { l: '(2u-15)(u-10)', r: '0' },
    { h: `${M('u=\\dfrac{15}{2}')} 或 ${M('u=10')}` },
    { k: '表', h: `${M('u=\\dfrac{15}{2}')}：沿牆 20 m；${M('u=10')}：沿牆 15 m。` }
  ], [
    { k: '驗', h: `沿牆的邊不能超過牆長 ${M('a')}。` },
    { k: '答', h: `${M('a<15')}：沒有可行尺寸。`, cls: 'answer' },
    { h: `${M('15\\le a<20')}：只有沿牆 15 m、垂直牆 10 m。`, cls: 'answer' },
    { h: `${M('a\\ge20')}：沿牆 20 m、垂直牆 7.5 m，或沿牆 15 m、垂直牆 10 m。`, cls: 'answer' }
  ]];
  const p1Trap = [`${M('a=15')} 時沿牆的邊剛好等於牆長，<span class="hl">仍然可以</span>。`];

  // ---------- 練習 2：牆對面有門口 ----------
  const p2Q = ['利用一幅長 18 m 的直牆作長方形圍場的一邊，對面留 2 m 闊門口，其餘三邊用共 33 m 圍欄。', '(a) 若面積為 150 m²，求可行尺寸。　(b) 能否用同樣材料及安排圍成 200 m²？說明理由。'];
  const p2Rows = [[
    { h: '<b>(a)</b>' },
    { k: '設', h: `設垂直於牆的邊長為 ${M('u')} m，平行於牆的邊長為 ${M('v')} m。` },
    { k: '表', h: `圍欄 ${M('2u+v-2=33')}，即 ${M('v=35-2u')}。` },
    { k: '列', l: 'u(35-2u)', r: '150' },
    { k: '解', l: '2u^2-35u+150', r: '0' },
    { l: '(2u-15)(u-10)', r: '0' },
    { k: '驗', h: `${M('u=\\dfrac{15}{2}')}：${M('v=20>18')}，不合；${M('u=10')}：${M('v=15')} ✓` },
    { k: '答', h: '(a) 垂直於牆 10 m，平行於牆 15 m。', cls: 'answer' }
  ], [
    { h: '<b>(b)</b>' },
    { k: '列', l: 'u(35-2u)', r: '200' },
    { k: '解', l: '2u^2-35u+200', r: '0' },
    { l: '\\Delta', r: '(-35)^2-4(2)(200)' },
    { r: '-375<0' },
    { k: '驗', h: '方程沒有實根。' },
    { k: '答', h: '(b) 不能圍成 200 m²。', cls: 'answer' }
  ]];
  const p2Trap = ['門口在牆的<span class="hl">對面</span>，那一邊的圍欄要減 2 m。'];

  // ---------- 練習 3：內部分隔欄 EF ----------
  const p3Q = [`如圖，利用一幅長 22 m 的牆作長方形圍場 ${M('ABCD')} 的一邊 ${M('AD')}，用共 36 m 圍欄圍另外三邊，並加一條垂直牆的內部分隔欄 ${M('EF')}。若圍場面積為 96 m²，求 ${M('AB')}、${M('BC')}。`];
  function dividedSVG() {
    const x0 = 120, y0 = 30, W = 220, H = 130;
    let g = `<line x1="${x0}" y1="${y0}" x2="${x0 + W}" y2="${y0}" stroke="${INK}" stroke-width="4"/>`;
    for (let i = x0 + 4; i < x0 + W; i += 14) g += `<line x1="${i}" y1="${y0 - 2}" x2="${i + 9}" y2="${y0 - 12}" stroke="${MUTED}" stroke-width="1.5"/>`;
    g += `<path d="M${x0} ${y0} V${y0 + H} H${x0 + W} V${y0} M${x0 + W / 2} ${y0} V${y0 + H}" fill="none" stroke="${HL}" stroke-width="4"/>`;
    g += tx(x0 - 14, y0, 'A', 18, INK, 700) + tx(x0 + W / 2 + 12, y0 + 14, 'E', 18, INK, 700) + tx(x0 + W + 14, y0, 'D', 18, INK, 700);
    g += tx(x0 - 14, y0 + H, 'B', 18, INK, 700) + tx(x0 + W / 2, y0 + H + 18, 'F', 18, INK, 700) + tx(x0 + W + 14, y0 + H, 'C', 18, INK, 700);
    return `<svg viewBox="0 0 460 180" role="img" aria-label="圍場 ABCD，AD 靠牆，EF 為內部分隔欄">${g}</svg>`;
  }
  const p3Rows = [[
    { k: '設', h: `設 ${M('AB=u')} m；${M('AB')}、${M('EF')}、${M('DC')} 三條都垂直於牆。` },
    { k: '表', h: `${M('3u+BC=36')}，即 ${M('BC=(36-3u)')} m。` },
    { k: '列', l: 'u(36-3u)', r: '96' },
    { k: '解', l: '3u^2-36u+96', r: '0' },
    { l: 'u^2-12u+32', r: '0' },
    { l: '(u-4)(u-8)', r: '0' },
    { h: `${M('u=4')} 或 ${M('u=8')}` }
  ], [
    { k: '驗', h: `${M('u=4')}：${M('BC=24>22')}，比牆長，不合。` },
    { h: `${M('u=8')}：${M('BC=12\\le22')} ✓` },
    { k: '答', h: `${M('AB=8')} m，${M('BC=12')} m。`, cls: 'answer' }
  ]];
  const p3Trap = [`分隔欄 ${M('EF')} 也用圍欄：垂直於牆的有 <span class="hl">3 條</span>。`];

  A.insertAfter('(3) 例題1 · 解・驗・答', [
    ...tryPages(S, `${SEC}　做一做 1`, '(3) 做一做1', t1Q, t1P1, t1Rows, t1Trap),
    practice(S, `${SEC}　練習 1`, '(3) 練習1', p1Q, { cols: p1Rows, trap: p1Trap }),
    practice(S, `${SEC}　練習 2`, '(3) 練習2', p2Q, { cols: p2Rows, trap: p2Trap }),
    practice(S, `${SEC}　練習 3`, '(3) 練習3', p3Q, { cols: p3Rows, trap: p3Trap, figHTML: dividedSVG() })
  ]);
})();
