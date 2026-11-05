/* =====================================================================
   Timeline 60 detik – 7 scene + transisi
   ===================================================================== */
'use strict';

function cam(s, cx, cy) { ctx.translate(W / 2, H / 2); ctx.scale(s, s); ctx.translate(-cx, -cy); }
function bg(c) { ctx.fillStyle = c; ctx.fillRect(-W * 2, -H * 2, W * 5, H * 5); }
function dotGrid(col, gap, off = 0, a = .16) {
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col;
  for (let y = -gap; y < H + gap; y += gap) for (let x = -gap; x < W + gap; x += gap) {
    ctx.beginPath(); ctx.arc(x + (off % gap), y + ((off * .5) % gap), 3, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}
function noteCard(x, y, w, h, rot, k, fill = WHITE) {
  withT(x, y, 1, rot, () => rrect(-w / 2, -h / 2, w, h, 22, { fill, lw: 5, shadow: 12, tex: false }), k);
}

/* ============ 0-5s OPENING ============ */
function sOpening(t) {
  bg(PAPER);
  ctx.save(); cam(1 + t * 0.008, 960, 540);
  // gandum dari tepi
  const stalks = [
    [40, 1110, 430, 0.30, 0.10], [150, 1120, 360, 0.55, 0.25], [-20, 1080, 330, 0.08, 0.35],
    [1880, 1110, 430, -0.30, 0.15], [1770, 1120, 360, -0.55, 0.30], [1940, 1080, 330, -0.08, 0.40],
    [60, -40, 300, Math.PI - 0.5, 0.45], [1860, -40, 300, Math.PI + 0.5, 0.5],
  ];
  stalks.forEach(([x, y, l, r, d], i) => {
    const k = E.out(prog(t, d, d + 1.5));
    const sway = Math.sin(t * 1.4 + i) * 0.025;
    withT(x, y, 1, r + sway, () => wheat(l, k, i, r < 0 || r > Math.PI ? -1 : 1));
  });
  // daun kecil & sparkle
  [[300, 160, .4], [1620, 170, .5], [250, 640, .9], [1680, 650, 1.0]].forEach(([x, y, d], i) => {
    const k = pop(t, d + .8);
    if (k > 0) withT(x, y + Math.sin(t * 2 + i) * 6, k, i * 1.3 + t * .3, () => sparkle(16 + (i % 2) * 6));
  });
  // logo pop
  const lk = pop(t, 0.8, 0.7);
  if (lk > 0) {
    const r = 200;
    withT(960, 395, lk, Math.sin(t * 1.5) * 0.02, () => {
      circle(0, 0, r + 22, { fill: GOLD, lw: 5, shadow: 14 });
      circle(0, 0, r + 40, { lw: 3.5, amp: 3, reveal: E.out(prog(t, 1.1, 2.0)), closed: true });
      if (IMG.logo) ctx.drawImage(IMG.logo, -r * 1.16, -r * 1.16, r * 2.32, r * 2.32);
    });
    // garis "pop"
    const bk = prog(t, 0.9, 1.5);
    if (bk > 0 && bk < 1) for (let i = 0; i < 12; i++) {
      const a = i / 12 * Math.PI * 2, r0 = 250 + E.out(bk) * 60, r1 = r0 + 40 * (1 - bk);
      line([[960 + Math.cos(a) * r0, 395 + Math.sin(a) * r0], [960 + Math.cos(a) * r1, 395 + Math.sin(a) * r1]], { lw: 5, stroke: i % 2 ? NAVY : GOLD2 });
    }
  }
  // judul
  const tk = prog(t, 1.6, 2.6);
  if (tk > 0) {
    const w = textW('CV Banong Farms', `700 118px ${F_HEAD}`);
    marker(960 - w / 2 - 10, 735, w + 20, 34, E.out(prog(t, 2.3, 3.0)), GOLD);
    htext('CV Banong Farms', 960, 730, { size: 118, weight: 700, reveal: tk });
  }
  const sk = prog(t, 2.6, 3.5);
  if (sk > 0) htext('Toko Pakan Ternak Grosir & Ecer', 960, 840, { size: 62, weight: 400, family: F_HAND, reveal: sk });
  ctx.restore();
  // maskot pojok
  const mk = pop(t, 3.4, .7);
  if (mk > 0) withT(1760, 930 + (1 - mk) * 200, mk, 0, () => mascotBadge(100, t));
}

/* ============ 5-12s STORY ============ */
function shopFacade(t) {
  // dunia ~ x 380..2000, tanah y=900
  // atap
  poly([[340, 365], [430, 250], [1930, 250], [2020, 365]], { fill: NAVY, lw: 6, shadow: 10 });
  for (let i = 0; i < 14; i++) line([[470 + i * 105, 256], [420 + i * 112, 360]], { lw: 3, stroke: '#3A5795', amp: 1.5 });
  // dinding
  rrect(380, 360, 1620, 545, 6, { fill: WHITE, lw: 6 });
  // banner hijau
  withT(1180, 425, 1, Math.sin(t * 2) * 0.004, () => {
    rrect(-640, -52, 1280, 104, 10, { fill: '#4E9B57', lw: 5, shadow: 6 });
    rrect(-622, -38, 1244, 76, 8, { lw: 3, stroke: '#D8EBC9', amp: 1.5 });
    htext('CV Banong Farms', 0, 22, { size: 64, weight: 700, color: WHITE, jit: .5 });
    withT(-520, 0, 1, -0.5, () => leafShape(60, GOLD)); withT(520, 0, 1, Math.PI + 0.5, () => leafShape(60, GOLD));
  });
  // awning bergaris
  const ax0 = 400, ax1 = 1980, ay = 490, n = 16, sw = (ax1 - ax0) / n;
  for (let i = 0; i < n; i++) {
    const x = ax0 + i * sw;
    path([['M', x, ay], ['L', x + sw, ay], ['L', x + sw, ay + 60], ['Q', x + sw / 2, ay + 95, x, ay + 60], ['Z']], { fill: i % 2 ? WHITE : GOLD, lw: 4, shadow: 6 });
  }
  // bay
  const bays = [[460, 940], [1000, 1380], [1440, 1920]];
  bays.forEach(([x0, x1]) => rrect(x0, 600, x1 - x0, 300, 8, { fill: '#1B336B', lw: 5, texDark: false }));
  // bay1 tumpukan karung
  const rows = [5, 4, 3, 2];
  rows.forEach((c, r) => { for (let i = 0; i < c; i++) withT(520 + r * 42 + i * 86, 860 - r * 64, 1, (hash(i + r * 9) - .5) * .06, () => feedSack(84, 70, (i + r) % 2 ? GOLD : WHITE, 'none')); });
  // bay2 rak obat
  for (let s = 0; s < 3; s++) {
    line([[1015, 690 + s * 72], [1365, 690 + s * 72]], { lw: 5, stroke: GOLD });
    for (let i = 0; i < 6; i++) withT(1045 + i * 56, 670 + s * 72, .32, 0, () => medicineBottle(1));
  }
  // bay3 karung + sangkar
  for (let i = 0; i < 4; i++) withT(1500 + i * 100, 850, 1, 0, () => feedSack(92, 90, i % 2 ? WHITE : GOLD, i === 1 ? 'fish' : 'none'));
  for (let i = 0; i < 3; i++) withT(1540 + i * 150, 690 + Math.sin(t * 2 + i) * 3, .5, Math.sin(t * 1.6 + i) * .05, () => birdCage(1));
  // karung di luar
  for (let i = 0; i < 3; i++) withT(2070 + i * 70, 868 - (i === 1 ? 60 : 0), 1, 0, () => feedSack(80, 66, GOLD, 'none'));
  withT(2140, 868, 1, 0, () => feedSack(80, 66, WHITE, 'none'));
}
function sStory(t) {
  const k = E.inOut(prog(t, 0, 7));
  const pan = k * 560;
  // langit pagi
  const g = ctx.createLinearGradient(0, 0, 0, 900);
  g.addColorStop(0, '#FFF2B8'); g.addColorStop(.6, PAPER); g.addColorStop(1, PAPER);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // matahari & awan (parallax lambat)
  withT(300 - pan * .15, 200, 1, 0, () => sun(78, t));
  [[700, 150, 70, .2], [1400, 110, 54, .25], [2100, 180, 64, .3]].forEach(([x, y, s, p], i) => withT(x - pan * p + t * 12, y, 1, 0, () => cloud(s)));
  // bukit
  ctx.save(); ctx.globalAlpha = .9;
  withT(-pan * .4, 0, 1, 0, () => {
    path([['M', -200, 900], ['Q', 300, 560, 800, 760], ['Q', 1200, 540, 1700, 720], ['Q', 2200, 580, 2600, 760], ['L', 2600, 900], ['Z']], { fill: '#E3E9F4', lw: 4, stroke: '#9FB0CF' });
  });
  ctx.restore();
  // toko
  ctx.save(); ctx.translate(-pan, 0);
  shopFacade(t);
  ctx.restore();
  // tanah depan
  path([['M', -40, 905], ['Q', 600, 890, 1960, 905], ['L', 1960, 1120], ['L', -40, 1120], ['Z']], { fill: '#FBF6E4', lw: 5 });
  for (let i = 0; i < 14; i++) {
    const x = ((i * 157 - pan * 1.1) % 2100 + 2100) % 2100 - 90;
    line([[x, 990 + (i % 3) * 30], [x + 8, 972 + (i % 3) * 30], [x + 16, 990 + (i % 3) * 30]], { lw: 3, stroke: LEAF });
  }
  // anak ayam & bebek berjalan
  const parade = ['chick', 'chick', 'duck', 'chick', 'duck', 'chick'];
  parade.forEach((a, i) => {
    const x = -260 + (t - .3) * 330 - i * 150;
    if (x < -150 || x > 2100) return;
    const ph = t * 12 + i * 1.7;
    const y = 975 + Math.abs(Math.sin(ph * .5)) * -10;
    withT(x, y, 1, Math.sin(ph * .5) * .06, () => a === 'chick' ? chick(1.25, ph) : duck(1.05, ph));
  });
  // kartu teks
  const c1 = E.outBack(prog(t, 1.5, 2.2), 1.6);
  if (c1 > 0) {
    withT(-700 + c1 * 1170, 210, 1, -0.025, () => {
      rrect(-370, -120, 740, 250, 26, { fill: WHITE, lw: 5, shadow: 12, tex: false });
      // selotip
      withT(0, -122, 1, 0.04, () => { ctx.save(); ctx.globalAlpha *= .85; rrect(-70, -18, 140, 36, 4, { fill: GOLD, lw: 3 }); ctx.restore(); });
      htext('Sejak 2015', 0, -10, { size: 92, weight: 700, reveal: prog(t, 1.8, 2.6) });
      marker(-300, 72, 600, 6, E.out(prog(t, 2.6, 3.2)), GOLD);
      htext('Dari budidaya mandiri di Ajibarang', 0, 64, { size: 46, weight: 400, family: F_HAND, reveal: prog(t, 2.9, 4.0) });
    });
  }
  // kalender
  const ck = pop(t, .4, .6);
  if (ck > 0) withT(1660, 230, ck, 0.05 + Math.sin(t * 1.5) * 0.015, () => {
    rrect(-125, -110, 250, 250, 20, { fill: WHITE, lw: 5, shadow: 12, tex: false });
    rrect(-125, -110, 250, 70, 20, { fill: GOLD, lw: 5 });
    for (const x of [-70, 0, 70]) { circle(x, -112, 9, { fill: WHITE, lw: 4 }); line([[x, -130], [x, -100]], { lw: 5 }); }
    // halaman membalik
    const flips = 4;
    const fk = prog(t, .9, 2.1) * flips;
    const done = Math.floor(fk);
    if (done >= flips) {
      htext('2015', 0, 85, { size: 98, weight: 700, jit: .4 });
    } else {
      // halaman kosong dengan garis
      for (let i = 0; i < 3; i++) line([[-80, 0 + i * 38], [80, 0 + i * 38]], { lw: 3, stroke: '#C9D3E6' });
      const f = fk - done; // halaman yang sedang membalik ke atas
      ctx.save(); ctx.scale(1, Math.cos(f * Math.PI / 2 * 1.0));
      rrect(-118, -40, 236, 176, 10, { fill: '#FDFDFE', lw: 4, tex: false });
      ctx.restore();
    }
  });
}

/* ============ 12-20s TAGLINE + PARADE HEWAN ============ */
function sTagline(t) {
  bg(NAVY);
  // sunburst
  const sk = E.out(prog(t, 0, 1.2));
  ctx.save(); ctx.translate(960, 1150); ctx.rotate(t * 0.06); ctx.scale(sk, sk);
  const n = 28;
  for (let i = 0; i < n; i++) {
    const a0 = i / n * Math.PI * 2, a1 = (i + .5) / n * Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(a0) * 2400, Math.sin(a0) * 2400); ctx.lineTo(Math.cos(a1) * 2400, Math.sin(a1) * 2400); ctx.closePath();
    ctx.fillStyle = 'rgba(255,214,10,0.07)'; ctx.fill();
  }
  for (let i = 0; i < n; i++) { const a = (i + .25) / n * Math.PI * 2; line([[Math.cos(a) * 420, Math.sin(a) * 420], [Math.cos(a) * (560 + (i % 2) * 120), Math.sin(a) * (560 + (i % 2) * 120)]], { lw: 6, stroke: GOLD }); }
  ctx.restore();
  withT(960, 1150, sk, 0, () => { circle(0, 0, 380, { fill: GOLD, lw: 6 }); circle(0, 0, 330, { lw: 4, stroke: GOLD2, amp: 3 }); });
  // headline
  htext('Membangun Kemitraan,', 960, 250, { size: 104, weight: 700, color: WHITE, reveal: prog(t, .5, 1.9) });
  htext('Memajukan Peternak.', 960, 385, { size: 104, weight: 700, color: GOLD, reveal: prog(t, 1.5, 2.8) });
  const ul = E.out(prog(t, 2.6, 3.3));
  if (ul > 0) line(pathPts([['M', 560, 425], ['Q', 960, 450 , 960 + 400 * (ul * 2 - 1), 425]]), { lw: 6, stroke: GOLD, reveal: ul });
  // tile hewan
  const N = 9;
  for (let i = 0; i < N; i++) {
    const x = 960 + (i - 4) * 196;
    const baseY = 700 - Math.cos((i - 4) / 4 * 1.2) * 40 + 40;
    const k = E.outBack(prog(t, 1.0 + i * 0.16, 1.7 + i * 0.16), 2.4);
    if (k <= 0) continue;
    const bob = Math.sin(t * 2.6 + i * 0.8) * 10;
    const tilt = ((i % 3) - 1) * 0.07 + Math.sin(t * 2 + i) * 0.03;
    withT(x, baseY + (1 - k) * 420 + bob, 0.6 + 0.4 * k, tilt, () => animalTile(i, 168));
  }
  // maskot pojok
  const mk = pop(t, 3.6, .7);
  if (mk > 0) withT(1790, 120, mk * .8, 0, () => mascotBadge(90, t));
}

/* ============ 20-32s PRODUK ============ */
const PRODUCTS = [
  { l1: 'Pakan Ternak &', l2: 'Hewan Peliharaan' },
  { l1: 'Obat, Vitamin', l2: '& Vaksin' },
  { l1: 'Bibit DOC,', l2: 'DOQ & DOD' },
  { l1: 'Perlengkapan', l2: 'Kandang' },
];
function productIllus(i, t) {
  if (i === 0) {
    withT(-62, -96, 1, -0.04, () => feedSack(150, 190, GOLD, 'chicken'));
    withT(88, -46, 1, 0, () => fishBowl(64));
  } else if (i === 1) {
    withT(-72, -96, 1.05, 0, () => medicineBottle(1));
    withT(78, -170, .8, -0.5, () => capsule(1));
    withT(72, -40, .78, -0.35, () => syringe(1));
  } else if (i === 2) {
    const ck = prog(t, 0.6, 1.4);
    withT(-70, -84, 1.35, Math.sin(t * 8) * 0.04 * (1 - ck), () => egg(1, E.outBack(ck)));
    withT(78, -170, .62, 0, () => duck(1, t * 10));
    withT(84, -50, .9, 0, () => quail(1));
  } else {
    withT(-78, -100, .95, Math.sin(t * 1.5) * 0.03, () => birdCage(1));
    withT(92, -160, .62, 0, () => feeder(1));
    withT(92, -36, .62, 0, () => drinker(1));
  }
}
function productCard(i, t, k) {
  const w = 400, h = 540;
  rrect(-w / 2, -h / 2, w, h, 34, { fill: WHITE, lw: 5, shadow: 16, tex: false });
  // tab kecil kuning
  rrect(-w / 2 + 26, -h / 2 + 24, 60, 14, 7, { fill: GOLD, lw: 3 });
  productIllus(i, t);
  const p = PRODUCTS[i];
  const f = `600 40px ${F_HEAD}`;
  const lk = prog(t, 0.5, 1.4);
  const w1 = textW(p.l1, f), w2 = textW(p.l2, f);
  marker(-w1 / 2 - 8, 118, w1 + 16, 18, E.out(prog(t, 1.1, 1.6)), GOLD);
  marker(-w2 / 2 - 8, 172, w2 + 16, 18, E.out(prog(t, 1.3, 1.8)), GOLD);
  htext(p.l1, 0, 112, { size: 40, weight: 600, reveal: lk });
  htext(p.l2, 0, 166, { size: 40, weight: 600, reveal: prog(t, .8, 1.7) });
}
function sProducts(t) {
  bg(PAPER);
  dotGrid(NAVY, 46, t * 8, .14);
  const SLOT = i => [960 + (i - 1.5) * 445, 560];
  const step = 2.5;
  // kamera
  let cx, cy, cs;
  const fi = clamp(Math.floor((t + 0.15) / step), 0, 3);
  const mv = E.inOut(prog(t, fi * step - 0.15, fi * step + 0.5));
  const prev = SLOT(Math.max(0, fi - 1)), cur = SLOT(fi);
  cx = lerp(prev[0], cur[0], fi === 0 ? 1 : mv); cy = 560; cs = 1.42;
  const zo = E.inOut(prog(t, 10.0, 11.3));
  cx = lerp(cx, 960, zo); cy = lerp(cy, 560, zo); cs = lerp(cs, 1.0, zo);
  ctx.save(); cam(cs, cx, cy);
  for (let i = 0; i < 4; i++) {
    const t0 = i * step + 0.3;
    const k = E.outBack(prog(t, t0, t0 + 0.6), 2.2);
    if (k <= 0) continue;
    const [x, y] = SLOT(i);
    const bob = Math.sin(t * 2 + i * 1.3) * 5 * zo;
    withT(x, y + bob, k, ((i % 2) ? 0.025 : -0.025) * (1 - .5 * zo), () => productCard(i, t - t0, k));
  }
  ctx.restore();
  const mk = pop(t, 10.6, .7);
  if (mk > 0) withT(1800, 960 + (1 - mk) * 200, mk * .85, 0, () => mascotBadge(90, t));
  // sparkle saat zoom out
  if (zo > 0) [[160, 160], [1760, 150], [130, 930], [960, 140]].forEach(([x, y], i) => withT(x, y, pop(t, 10.4 + i * .15), t + i, () => sparkle(18)));
}

/* ============ 32-40s KEPERCAYAAN & ANGKA ============ */
const STATS = [
  { v: 2015, from: 2000, fmt: v => String(Math.round(v)), label: 'Awal Budidaya Mandiri' },
  { v: 14000, from: 0, fmt: v => Math.round(v).toLocaleString('id-ID') + '+', label: 'Sak Pakan Tersalurkan' },
  { v: 100, from: 0, fmt: v => Math.round(v) + '%', label: 'Standar Pabrik Asli' },
  { v: 4, from: 0, fmt: v => String(Math.round(v)), label: 'Wilayah Pengantaran' },
];
function sTrust(t) {
  bg(NAVY);
  ctx.save(); ctx.globalAlpha = .5; dotGrid(WHITE, 60, -t * 10, .10); ctx.restore();
  STATS.forEach((s, i) => {
    const x = 960 + (i - 1.5) * 430, y = 470;
    const t0 = 0.3 + i * 0.35;
    const k = pop(t, t0, .6);
    if (k <= 0) return;
    withT(x, y + Math.sin(t * 2 + i) * 4, k, 0, () => {
      circle(0, 0, 160, { fill: '#122A60', lw: 0, stroke: null, tex: true, texA: .25 });
      circle(0, 0, 160, { lw: 8, stroke: GOLD, reveal: E.out(prog(t, t0, t0 + .9)) });
      circle(0, 0, 140, { lw: 3, stroke: 'rgba(255,214,10,0.5)', amp: 2.5 });
      const ck = E.out(prog(t, t0 + .3, t0 + 2.1));
      const txt = s.fmt(lerp(s.from, s.v, ck));
      const size = txt.length > 5 ? 74 : 96;
      htext(txt, 0, size * 0.36, { size, weight: 700, color: WHITE, jit: .5 });
    });
    const lk = prog(t, t0 + .7, t0 + 1.6);
    if (lk > 0) htext(s.label, x, y + 235, { size: 42, weight: 400, family: F_HAND, color: GOLD, reveal: lk });
  });
  // jalan
  for (let i = 0; i < 16; i++) { const x = ((i * 150 - t * 260) % 2400 + 2400) % 2400 - 200; line([[x, 1040], [x + 70, 1040]], { lw: 6, stroke: 'rgba(255,214,10,0.55)' }); }
  line([[-20, 1010], [1940, 1010]], { lw: 4, stroke: '#2A4788' });
  // truk
  const tx = -420 + prog(t, 0.6, 7.4) * 2800;
  withT(tx, 1000 + Math.sin(t * 18) * 1.5, .72, 0, () => truck(t));
  // stempel
  const st = prog(t, 4.4, 4.75);
  if (st > 0) {
    const s = st < 1 ? lerp(2.4, 1, E.in(st)) : 1;
    const shake = (t > 4.75 && t < 5.1) ? Math.sin(t * 90) * 5 * (1 - prog(t, 4.75, 5.1)) : 0;
    withT(960 + shake, 135, s, -0.03, () => {
      ctx.globalAlpha *= clamp(st * 2);
      rrect(-520, -66, 1040, 132, 26, { lw: 7, stroke: GOLD, fill: 'rgba(255,214,10,0.10)', tex: false });
      rrect(-500, -50, 1000, 100, 18, { lw: 3, stroke: GOLD, amp: 2 });
      htext('Agen Resmi PT. New Hope Indonesia', 0, 20, { size: 56, weight: 700, color: GOLD, jit: .6 });
      withT(-468, 0, 1, t, () => sparkle(14)); withT(468, 0, 1, -t, () => sparkle(14));
    });
    // debu tumbukan
    const dk = prog(t, 4.75, 5.4);
    if (dk > 0 && dk < 1) for (let i = 0; i < 10; i++) {
      const a = i / 10 * Math.PI * 2;
      ctx.save(); ctx.globalAlpha *= 1 - dk;
      circle(960 + Math.cos(a) * (540 + dk * 60) * (i % 2 ? 1 : .3), 135 + Math.sin(a) * (70 + dk * 40), 6 + dk * 8, { lw: 3, stroke: GOLD });
      ctx.restore();
    }
  }
}

/* ============ 40-52s WEBSITE SHOWCASE ============ */
const LAP = { x: 760, y: 545, sw: 960, sh: 600 };
const PHN = { x: 1500, y: 610, sw: 250, sh: 541 };
function sWeb(t) {
  bg(PAPER);
  // kamera
  const zin = E.inOut(prog(t, 2.3, 3.5));
  const zout = E.inOut(prog(t, 10.4, 11.8));
  const z = zin * (1 - zout);
  ctx.save();
  cam(lerp(1, 1.74, z), lerp(960, LAP.x, z), lerp(540, LAP.y + 10, z));
  // meja
  path([['M', -200, 905], ['Q', 960, 890, 2200, 905], ['L', 2200, 1300], ['L', -200, 1300], ['Z']], { fill: '#F1E7CF', lw: 5 });
  line(pathPts([['M', -200, 940], ['Q', 960, 930, 2200, 940]]), { lw: 3, stroke: '#D9C9A3' });
  // dekor
  [[130, 230, 0], [1830, 760, 6], [120, 740, 3]].forEach(([x, y, a], i) => {
    const k = pop(t, .5 + i * .2);
    if (k > 0) withT(x, y + Math.sin(t * 2 + i) * 6, k * .62, (i - 1) * .12, () => animalTile(a, 168));
  });
  [[60, 960, -0.6], [1860, 960, -2.6], [280, 920, -1.2]].forEach(([x, y, r], i) => withT(x, y, pop(t, .3 + i * .1), r + Math.sin(t * 1.4 + i) * .04, () => leafShape(110 + i * 10, i % 2 ? GOLD : WHITE)));
  // pot tanaman
  withT(1790, 880, pop(t, .9), 0, () => {
    for (let i = 0; i < 4; i++) withT(0, -40, 1, -2.3 + i * .55 + Math.sin(t * 1.5 + i) * .05, () => leafShape(80, i % 2 ? WHITE : GOLD));
    path([['M', -40, -40], ['L', 40, -40], ['L', 30, 20], ['L', -30, 20], ['Z']], { fill: NAVY, lw: 5 });
  });
  // laptop
  const lk = E.outBack(prog(t, 0, 1.1), 1.3);
  const lx = LAP.x - (1 - lk) * 1500;
  withT(lx, LAP.y, 1, 0, () => {
    laptopFrame(LAP.sw, LAP.sh);
    // isi layar: hero -> katalog -> kembali ke hero
    const sc1 = E.inOut(prog(t, 4.5, 6.4));
    const sc2 = E.inOut(prog(t, 7.6, 8.5));
    const scroll = (sc1 - sc2) * LAP.sh; // dalam satuan layar
    const x0 = -LAP.sw / 2, y0 = -LAP.sh / 2;
    ctx.save();
    ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x0, y0, LAP.sw, LAP.sh, 8); else ctx.rect(x0, y0, LAP.sw, LAP.sh); ctx.clip();
    ctx.fillStyle = WHITE; ctx.fillRect(x0, y0, LAP.sw, LAP.sh);
    if (IMG.hero) ctx.drawImage(IMG.hero, x0, y0 - scroll, LAP.sw, LAP.sh);
    if (IMG.catalog) ctx.drawImage(IMG.catalog, x0, y0 - scroll + LAP.sh, LAP.sw, LAP.sh);
    // overlay: cincin sorot tombol chat maskot (saat di katalog)
    if (sc1 > .95 && sc2 < .05) {
      const pk = prog(t, 6.4, 7.6);
      const cxp = x0 + 0.955 * LAP.sw, cyp = y0 + 0.918 * LAP.sh;
      for (let r = 0; r < 2; r++) {
        const q = (pk * 1.6 + r * .5) % 1;
        ctx.save(); ctx.globalAlpha *= (1 - q);
        circle(cxp, cyp, 30 + q * 40, { lw: 5, stroke: GOLD, amp: 1.5 });
        ctx.restore();
      }
    }
    ctx.restore();
    // overlay keranjang (sticky) dengan badge "3"
    const ck = pop(t, 3.9, .6);
    if (ck > 0) {
      const bx = x0 + 0.7525 * LAP.sw, by = y0 + 0.061 * LAP.sh;
      withT(bx - 6, by + 62, ck * .72, Math.sin(t * 3) * .05, () => {
        cartIcon(1);
        const bk = popEl(t, 4.3, 1.0);
        if (bk > 0) withT(30, -30, bk, 0, () => { circle(0, 0, 22, { fill: GOLD, lw: 4 }); htext('3', 0, 12, { size: 34, weight: 700, jit: .3 }); });
      });
    }
    // overlay tombol "Hubungi kami" + kursor + gelembung WA
    if (t > 8.4) {
      const bx = x0 + 0.849 * LAP.sw, by = y0 + 0.061 * LAP.sh;
      const press = t > 9.6 && t < 9.95 ? Math.sin(prog(t, 9.6, 9.95) * Math.PI) : 0;
      const hk = pop(t, 8.5, .5);
      withT(bx, by, hk * (1 - press * .08), 0, () => {
        rrect(-52, -15, 104, 30, 15, { fill: GOLD, lw: 3, amp: 1, tex: false });
        htext('Hubungi kami', 0, 6, { size: 16, weight: 600, jit: .2 });
      });
      // kursor
      const mv = E.inOut(prog(t, 8.6, 9.6));
      const cxp = lerp(LAP.sw * 0.2, bx + 10, mv), cyp = lerp(LAP.sh * 0.45, by + 6, mv);
      if (t < 11.6) withT(cxp, cyp, 0.55, -0.1, () => cursorHand(press));
      // ripple klik
      const rk = prog(t, 9.7, 10.3);
      if (rk > 0 && rk < 1) { ctx.save(); ctx.globalAlpha *= 1 - rk; circle(bx, by, 20 + rk * 50, { lw: 4, stroke: GOLD }); ctx.restore(); }
      const wk = popEl(t, 9.9, 1.0);
      if (wk > 0) withT(bx - 150, by + 130, wk * .62, 0, () => waBubble(1));
    }
  });
  // smartphone
  const pk = E.outBack(prog(t, 0.3, 1.4), 1.3);
  withT(PHN.x + (1 - pk) * 900, PHN.y, 1, 0.06, () => {
    phoneFrame(PHN.sw, PHN.sh);
    const ps = E.inOut(prog(t, 5.0, 9.0)) * 0;
    drawScreen(IMG.mhero, 0, 0, IMG.mhero ? IMG.mhero.width : 1, IMG.mhero ? IMG.mhero.height * .99 : 1, -PHN.sw / 2, -PHN.sh / 2 - ps, PHN.sw, PHN.sh, 32);
    rrect(-40, -PHN.sh / 2 + 8, 80, 16, 8, { fill: NAVY, lw: 0, stroke: null, tex: false });
    // tombol chat maskot melayang di HP
    const mk = pop(t, 1.8, .6);
    if (mk > 0) withT(PHN.sw / 2 - 42, PHN.sh / 2 - 46 + Math.sin(t * 3) * 4, mk * .38, 0, () => mascotBadge(90, t, false));
  });
  ctx.restore();
  // catatan samping
  const nk = E.outBack(prog(t, .9, 1.5), 1.5) * (1 - E.in(prog(t, 2.2, 2.8)));
  if (nk > 0) {
    withT(1590, 170, nk, 0.03, () => {
      rrect(-280, -110, 560, 220, 24, { fill: WHITE, lw: 5, shadow: 12, tex: false });
      withT(0, -112, 1, -0.05, () => { ctx.save(); ctx.globalAlpha *= .85; rrect(-60, -16, 120, 32, 4, { fill: GOLD, lw: 3 }); ctx.restore(); });
      htext('Website resmi', 0, -40, { size: 50, weight: 700, reveal: prog(t, 1.1, 1.7) });
      htext('dengan katalog &', 0, 20, { size: 44, weight: 400, family: F_HAND, reveal: prog(t, 1.4, 2.0) });
      htext('keranjang belanja', 0, 72, { size: 44, weight: 400, family: F_HAND, reveal: prog(t, 1.6, 2.2) });
    });
  }
  // catatan kedua saat zoom out (side text kembali)
  const nk2 = E.outBack(prog(t, 10.9, 11.5), 1.5);
  if (nk2 > 0) {
    withT(1590, 170, nk2, 0.03, () => {
      rrect(-280, -110, 560, 220, 24, { fill: WHITE, lw: 5, shadow: 12, tex: false });
      withT(0, -112, 1, -0.05, () => { ctx.save(); ctx.globalAlpha *= .85; rrect(-60, -16, 120, 32, 4, { fill: GOLD, lw: 3 }); ctx.restore(); });
      htext('Website resmi', 0, -40, { size: 50, weight: 700 });
      htext('dengan katalog &', 0, 20, { size: 44, weight: 400, family: F_HAND });
      htext('keranjang belanja', 0, 72, { size: 44, weight: 400, family: F_HAND });
    });
  }
}

/* ============ 52-60s CLOSING ============ */
function sClosing(t) {
  bg(PAPER);
  const stalks = [[40, 1110, 420, 0.32, 0.0], [150, 1120, 340, 0.6, .15], [1880, 1110, 420, -0.32, .05], [1770, 1120, 340, -0.6, .2]];
  stalks.forEach(([x, y, l, r, d], i) => withT(x, y, 1, r + Math.sin(t * 1.4 + i) * .03, () => wheat(l, E.out(prog(t, d, d + 1.3)), i, r < 0 ? -1 : 1)));
  // ikon hewan melayang
  [[230, 200, 0], [1690, 200, 5], [150, 540, 7], [1770, 520, 2], [470, 400, 8], [1450, 390, 4]].forEach(([x, y, a], i) => {
    const k = pop(t, .3 + i * .12);
    if (k > 0) withT(x + Math.sin(t * .9 + i) * 10, y + Math.sin(t * 1.3 + i * 2) * 12, k * .58, Math.sin(t + i) * .08, () => animalTile(a, 168));
  });
  // logo
  const lk = pop(t, .2, .7);
  if (lk > 0) withT(960, 285, lk, Math.sin(t * 1.5) * .02, () => {
    const r = 175;
    circle(0, 0, r + 20, { fill: GOLD, lw: 5, shadow: 14 });
    if (IMG.logo) ctx.drawImage(IMG.logo, -r * 1.16, -r * 1.16, r * 2.32, r * 2.32);
  });
  const w = textW('CV Banong Farms', `700 104px ${F_HEAD}`);
  marker(960 - w / 2 - 10, 585, w + 20, 30, E.out(prog(t, 1.6, 2.2)), GOLD);
  htext('CV Banong Farms', 960, 580, { size: 104, weight: 700, reveal: prog(t, .9, 1.8) });
  htext('Membangun Kemitraan, Memajukan Peternak.', 960, 676, { size: 54, weight: 500, reveal: prog(t, 1.8, 3.2) });
  // bar kontak
  const bk = E.outBack(prog(t, 3.2, 4.0), 1.4);
  if (bk > 0) {
    withT(960, 890 + (1 - bk) * 360, 1, 0, () => {
      rrect(-800, -100, 1600, 200, 40, { fill: NAVY, lw: 5, shadow: 14 });
      const items = [
        [iconPhone, 'WhatsApp 0857-2608-0086', -400, -45], [iconPin, 'Depan Pasar Hewan Ajibarang', 400, -45],
        [iconClock, 'Senin-Sabtu 07.30-16.00 WIB', -400, 48], [iconGlobe, 'cvbanongfarms.site', 400, 48],
      ];
      items.forEach(([ic, txt, x, y], i) => {
        const ik = pop(t, 3.7 + i * .15);
        const f = `600 40px ${F_HEAD}`, tw = textW(txt, f);
        withT(x - tw / 2 - 36, y - 2, ik, 0, ic);
        htext(txt, x + 14, y + 14, { size: 40, weight: 600, color: WHITE, reveal: prog(t, 3.8 + i * .15, 4.6 + i * .15), jit: .4 });
      });
    });
  }
  // maskot melambai
  const mk = pop(t, 4.4, .7);
  if (mk > 0) withT(1770, 700, mk, 0, () => mascotBadge(95, t));
}

/* ============================ TRANSISI ============================ */
const SC = [[0, 5, sOpening], [5, 12, sStory], [12, 20, sTagline], [20, 32, sProducts], [32, 40, sTrust], [40, 52, sWeb], [52, 60, sClosing]];
const TR = { 5: { k: 'iris', x: 960, y: 395 }, 12: { k: 'up' }, 20: { k: 'iris', x: 960, y: 700 }, 32: { k: 'up' }, 40: { k: 'iris', x: 960, y: 470 }, 52: { k: 'left' } };
const TD = 1.0;

function drawScene(i, t) { const s = SC[i]; ctx.save(); s[2](t - s[0]); ctx.restore(); }
function wobCircle(x, y, r, seed) { return wob(ellipsePts(x, y, r, r, 64), r * 0.02 + 4, seed); }
function waveEdge(p, horiz, lag) {
  // poligon area yang tertutup (dari bawah ke atas / dari kanan ke kiri)
  const pts = [];
  if (!horiz) {
    const yE = H + 120 - (H + 360) * p + lag;
    pts.push([-50, H + 60]);
    for (let i = 0; i <= 24; i++) { const x = -50 + i * (W + 100) / 24; pts.push([x, yE + Math.sin(i * .9 + T * 6) * 26]); }
    pts.push([W + 50, H + 60]);
  } else {
    const xE = W + 120 - (W + 360) * p + lag;
    pts.push([W + 60, -50]);
    for (let i = 0; i <= 16; i++) { const y = -50 + i * (H + 100) / 16; pts.push([xE + Math.sin(i * 1.1 + T * 6) * 26, y]); }
    pts.push([W + 60, H + 50]);
  }
  return pts;
}
function drawTransition(b, p) {
  const tr = TR[b];
  const ia = SC.findIndex(s => s[1] === b), ib = SC.findIndex(s => s[0] === b);
  drawScene(ia, T);
  const id = ++SID;
  if (tr.k === 'iris') {
    const maxR = 1250;
    const r1 = E.inOut(clamp(p * 1.1)) * maxR, r2 = E.inOut(clamp(p * 1.15 - .15)) * maxR;
    if (r1 > 1) {
      const c1 = wobCircle(tr.x, tr.y, r1, id);
      ctx.save(); tracePath(c1, true); ctx.fillStyle = GOLD; ctx.fill(); ctx.clip(); ctx.globalAlpha = .5; ctx.fillStyle = TEX.crayonPat; ctx.fillRect(0, 0, W, H); ctx.restore();
      if (r2 > 1) {
        ctx.save(); tracePath(wobCircle(tr.x, tr.y, r2, id + 1), true); ctx.clip(); drawScene(ib, T); ctx.restore();
        tracePath(wobCircle(tr.x, tr.y, r2, id + 1), true); ctx.strokeStyle = NAVY; ctx.lineWidth = 6; ctx.stroke();
      }
      tracePath(c1, true); ctx.strokeStyle = NAVY; ctx.lineWidth = 6; ctx.stroke();
    }
  } else {
    const horiz = tr.k === 'left';
    const e1 = waveEdge(E.inOut(clamp(p * 1.1)), horiz, 0);
    const e2 = waveEdge(E.inOut(clamp(p * 1.1 - .1)), horiz, 0);
    ctx.save(); tracePath(e1, true); ctx.fillStyle = GOLD; ctx.fill(); ctx.clip(); ctx.globalAlpha = .5; ctx.fillStyle = TEX.crayonPat; ctx.fillRect(0, 0, W, H); ctx.restore();
    ctx.save(); tracePath(e2, true); ctx.clip(); drawScene(ib, T); ctx.restore();
    line(e1.slice(1, -1), { lw: 6, amp: 1 }); line(e2.slice(1, -1), { lw: 6, amp: 1 });
  }
}

function render(t) {
  T = t; BOIL = Math.floor(t * 12); SID = 0;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  let done = false;
  for (const b of Object.keys(TR).map(Number)) {
    if (Math.abs(t - b) < TD / 2) { drawTransition(b, (t - (b - TD / 2)) / TD); done = true; break; }
  }
  if (!done) {
    let i = SC.findIndex(s => t >= s[0] && t < s[1]); if (i < 0) i = SC.length - 1;
    drawScene(i, t);
  }
  // fade akhir ke kertas (loop mulus ke awal)
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const fo = prog(t, 59.0, 59.9);
  if (fo > 0) { ctx.globalAlpha = E.sine(fo); ctx.fillStyle = PAPER; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
  // butiran kertas + vignette
  ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = .55;
  ctx.drawImage(TEX.grain, 0, 0);
  ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  ctx.drawImage(TEX.vignette, 0, 0);
}
