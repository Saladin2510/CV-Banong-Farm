/* =====================================================================
   Ilustrasi hand-drawn (semua di koordinat lokal, pusat 0,0)
   ===================================================================== */
'use strict';

/* --------------------------- Alam / dekor --------------------------- */
function wheat(len, k, seed = 0, flip = 1) {
  // batang gandum emas: k = progres sketsa 0..1
  const bend = 0.18 * flip;
  const stem = pathPts([['M', 0, 0], ['Q', len * bend, -len * 0.5, len * bend * 0.6, -len]], 8);
  line(stem, { lw: 4, reveal: clamp(k * 1.6), amp: 1.4 });
  // daun
  const lk = clamp((k - .25) * 2.2);
  if (lk > 0) {
    withT(stem[Math.floor(stem.length * .35)][0], stem[Math.floor(stem.length * .35)][1], E.outBack(lk), -0.9 * flip, () =>
      path([['M', 0, 0], ['Q', len * .12, -len * .1, len * .3, -len * .02], ['Q', len * .12, len * .04, 0, 0]], { fill: WHITE, lw: 3.5 }));
    withT(stem[Math.floor(stem.length * .55)][0], stem[Math.floor(stem.length * .55)][1], E.outBack(clamp(lk * 1.3 - .3)), Math.PI + 0.7 * flip, () =>
      path([['M', 0, 0], ['Q', len * .1, -len * .08, len * .24, -len * .02], ['Q', len * .1, len * .04, 0, 0]], { fill: GOLD, lw: 3.5 }));
  }
  // bulir
  const top = stem.length - 1;
  const ng = 7;
  for (let i = 0; i < ng; i++) {
    const gk = clamp(k * (ng + 6) - 6 - i * 0.7);
    if (gk <= 0) continue;
    const idx = Math.floor(top - i * (stem.length * 0.055));
    const pt = stem[Math.max(0, idx)];
    const s = E.outBack(clamp(gk)) * len * 0.055;
    for (const side of [-1, 1]) {
      withT(pt[0] + side * s * 0.7, pt[1], 1, side * 0.55 + bend, () => ell(0, 0, s * 0.55, s, { fill: GOLD, lw: 3, amp: 1 }));
    }
  }
  if (k > .95) withT(stem[top][0], stem[top][1] - len * .04, 1, bend, () => ell(0, 0, len * 0.025, len * 0.05, { fill: GOLD, lw: 3, amp: 1 }));
}
function leafShape(s, fill = WHITE) {
  path([['M', 0, 0], ['Q', s * .45, -s * .45, s, 0], ['Q', s * .45, s * .4, 0, 0]], { fill, lw: 3.5 });
  line([[s * .08, 0], [s * .85, -s * .02]], { lw: 2.5, amp: 1 });
}
function cloud(s) {
  shape(pathPts([['M', -s, s * .25], ['Q', -s * 1.05, -s * .3, -s * .45, -s * .25], ['Q', -s * .3, -s * .8, s * .2, -s * .55],
  ['Q', s * .75, -s * .7, s * .8, -s * .15], ['Q', s * 1.2, s * .05, s * .9, s * .3], ['L', -s, s * .25]]), { fill: WHITE, lw: 4, shadow: 6 });
}
function sun(r, t) {
  const n = 14;
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2 + t * 0.25;
    line([[Math.cos(a) * r * 1.25, Math.sin(a) * r * 1.25], [Math.cos(a) * r * 1.6, Math.sin(a) * r * 1.6]], { lw: 5, stroke: GOLD2 });
  }
  circle(0, 0, r, { fill: GOLD, lw: 5, shadow: 0 });
}
function sparkle(s, c = GOLD) {
  path([['M', 0, -s], ['Q', s * .15, -s * .15, s, 0], ['Q', s * .15, s * .15, 0, s], ['Q', -s * .15, s * .15, -s, 0], ['Q', -s * .15, -s * .15, 0, -s]], { fill: c, lw: 3, amp: 1 });
}

/* ------------------------------ Hewan ------------------------------ */
function eye(x, y, r = 5) { dot(x, y, r); dot(x - r * .35, y - r * .35, r * .35, WHITE); }
function blush(x, y, r = 8) { ctx.save(); ctx.globalAlpha *= .35; dot(x, y, r, ORANGE); ctx.restore(); }

function chicken(s = 1) {
  ctx.save(); ctx.scale(s, s);
  // ekor
  path([['M', -40, 0], ['Q', -70, -30, -58, -55], ['Q', -45, -35, -30, -30]], { fill: WHITE, lw: 4 });
  // jengger
  path([['M', 2, -62], ['Q', 4, -84, 16, -72], ['Q', 24, -88, 32, -70], ['Q', 44, -76, 38, -56]], { fill: ORANGE2, lw: 4 });
  // badan
  path([['M', -45, 5], ['Q', -45, -40, 0, -35], ['Q', 5, -68, 25, -62], ['Q', 48, -55, 42, -20], ['Q', 55, 30, 5, 42], ['Q', -45, 45, -45, 5]], { fill: WHITE, lw: 4.5, shadow: 5 });
  // sayap
  path([['M', -22, -2], ['Q', 5, -12, 14, 8], ['Q', -2, 25, -22, -2]], { fill: WHITE, lw: 3.5 });
  // paruh & pial
  path([['M', 40, -48], ['L', 56, -42], ['L', 40, -36]], { fill: ORANGE, lw: 3.5 });
  path([['M', 38, -34], ['Q', 46, -22, 36, -22], ['Q', 32, -28, 38, -34]], { fill: ORANGE2, lw: 3 });
  eye(28, -48, 4.5);
  // kaki
  line([[-6, 42], [-8, 58], [-16, 62]], { lw: 4, stroke: ORANGE2 }); line([[12, 41], [12, 58], [4, 62]], { lw: 4, stroke: ORANGE2 });
  ctx.restore();
}
function chick(s = 1, phase = 0) {
  ctx.save(); ctx.scale(s, s);
  const st = Math.sin(phase) * 8;
  line([[-6, 24], [-6 - st * .3, 38]], { lw: 3.5, stroke: ORANGE2 }); line([[8, 24], [8 + st * .3, 38]], { lw: 3.5, stroke: ORANGE2 });
  ell(0, 0, 30, 28, { fill: GOLD, lw: 4, shadow: 4 });
  path([['M', -16, 2], ['Q', -2, -6, 4, 10], ['Q', -10, 16, -16, 2]], { fill: GOLD2, lw: 3 });
  path([['M', 22, -6], ['L', 36, -1], ['L', 22, 4]], { fill: ORANGE, lw: 3 });
  eye(14, -9, 3.8);
  line([[-2, -27], [2, -36], [6, -27]], { lw: 3 });
  ctx.restore();
}
function duck(s = 1, phase = 0) {
  ctx.save(); ctx.scale(s, s);
  const st = Math.sin(phase) * 8;
  line([[-8, 30], [-8 - st * .3, 44], [-16, 46]], { lw: 4, stroke: ORANGE2 }); line([[10, 30], [10 + st * .3, 44], [2, 46]], { lw: 4, stroke: ORANGE2 });
  path([['M', -44, 4], ['Q', -52, -12, -40, -10], ['Q', -20, -14, 6, -8], ['Q', 4, -48, 30, -48], ['Q', 52, -46, 46, -20], ['Q', 40, -6, 36, 2], ['Q', 40, 34, 0, 34], ['Q', -38, 34, -44, 4]], { fill: WHITE, lw: 4.5, shadow: 5 });
  path([['M', 44, -34], ['Q', 66, -36, 66, -26], ['Q', 58, -20, 44, -24]], { fill: ORANGE, lw: 3.5 });
  path([['M', -24, 4], ['Q', 0, -6, 14, 12], ['Q', -6, 22, -24, 4]], { fill: WHITE, lw: 3.5 });
  eye(32, -34, 4.5);
  ctx.restore();
}
function quail(s = 1) {
  ctx.save(); ctx.scale(s, s);
  ell(0, 0, 36, 28, { fill: '#E9B97A', lw: 4, shadow: 4 });
  for (let i = 0; i < 6; i++) dot(-18 + i * 7, -2 + (i % 2) * 8, 2.6, NAVY);
  circle(26, -20, 16, { fill: '#E9B97A', lw: 4 });
  path([['M', 40, -22], ['L', 50, -18], ['L', 40, -14]], { fill: NAVY, lw: 2.5 });
  line([[22, -36], [26, -44], [32, -40]], { lw: 3 });
  eye(30, -23, 3.4);
  ctx.restore();
}
// kepala-kepala hewan untuk tile (radius ~ 55)
function cowHead() {
  path([['M', -40, -26], ['Q', -62, -40, -58, -22], ['Q', -52, -14, -38, -14]], { fill: WHITE, lw: 4 });
  path([['M', 40, -26], ['Q', 62, -40, 58, -22], ['Q', 52, -14, 38, -14]], { fill: WHITE, lw: 4 });
  path([['M', -24, -38], ['Q', -34, -60, -20, -58]], { fill: GOLD, lw: 4 }); path([['M', 24, -38], ['Q', 34, -60, 20, -58]], { fill: GOLD, lw: 4 });
  path([['M', -36, -30], ['Q', 0, -50, 36, -30], ['Q', 42, 10, 30, 30], ['L', -30, 30], ['Q', -42, 10, -36, -30]], { fill: WHITE, lw: 4.5 });
  path([['M', -26, -36], ['Q', -10, -30, -14, -16], ['Q', -30, -14, -34, -26]], { fill: NAVY, lw: 3, tex: false });
  ell(0, 26, 30, 18, { fill: '#F6C9A0', lw: 4 });
  dot(-10, 26, 4); dot(10, 26, 4);
  eye(-16, -4, 5); eye(16, -4, 5);
}
function goatHead() {
  path([['M', -18, -36], ['Q', -36, -64, -12, -66], ['Q', -20, -52, -8, -40]], { fill: GOLD, lw: 4 });
  path([['M', 18, -36], ['Q', 36, -64, 12, -66], ['Q', 20, -52, 8, -40]], { fill: GOLD, lw: 4 });
  path([['M', -30, -24], ['Q', -62, -18, -56, -6], ['Q', -44, -4, -30, -10]], { fill: WHITE, lw: 4 });
  path([['M', 30, -24], ['Q', 62, -18, 56, -6], ['Q', 44, -4, 30, -10]], { fill: WHITE, lw: 4 });
  path([['M', -28, -34], ['Q', 0, -46, 28, -34], ['Q', 30, 10, 16, 30], ['Q', 0, 40, -16, 30], ['Q', -30, 10, -28, -34]], { fill: WHITE, lw: 4.5 });
  path([['M', -8, 34], ['Q', 0, 58, 8, 34]], { fill: WHITE, lw: 3.5 });
  eye(-12, -10, 4.5); eye(12, -10, 4.5);
  line([[-5, 18], [0, 22], [5, 18]], { lw: 3 });
}
function rabbitHead() {
  path([['M', -22, -26], ['Q', -36, -86, -14, -84], ['Q', 0, -70, -6, -28]], { fill: WHITE, lw: 4 });
  path([['M', 22, -26], ['Q', 36, -86, 14, -84], ['Q', 0, -70, 6, -28]], { fill: WHITE, lw: 4 });
  path([['M', -18, -36], ['Q', -24, -72, -14, -72], ['Q', -8, -60, -11, -36]], { fill: '#F6C9A0', lw: 0, stroke: null, tex: false });
  path([['M', 18, -36], ['Q', 24, -72, 14, -72], ['Q', 8, -60, 11, -36]], { fill: '#F6C9A0', lw: 0, stroke: null, tex: false });
  ell(0, 4, 40, 36, { fill: WHITE, lw: 4.5 });
  eye(-14, -2, 4.5); eye(14, -2, 4.5);
  path([['M', -5, 10], ['L', 5, 10], ['L', 0, 16]], { fill: ORANGE2, lw: 2.5 });
  blush(-24, 14); blush(24, 14);
}
function fishBubble() {
  circle(0, 0, 54, { fill: 'rgba(255,255,255,0.9)', lw: 4.5 });
  ctx.save(); ctx.globalAlpha *= .5; line(pathPts([['M', -34, -22], ['Q', -24, -40, -4, -42]]), { lw: 5, stroke: '#BFD3EE' }); ctx.restore();
  withT(0, 6, 1, Math.sin(T * 3) * 0.08, () => {
    path([['M', -26, 0], ['Q', -6, -22, 18, -4], ['L', 32, -16], ['L', 30, 14], ['L', 18, 4], ['Q', -6, 22, -26, 0]], { fill: ORANGE, lw: 4 });
    eye(-12, -3, 3.5);
  });
  circle(28, -32, 5, { lw: 2.5 }); circle(36, -44, 3.5, { lw: 2.5 });
}
function birdHead() {
  path([['M', -36, 20], ['Q', -40, -40, 6, -40], ['Q', 40, -36, 36, 6], ['Q', 30, 38, -6, 38], ['Q', -30, 36, -36, 20]], { fill: LEAF, lw: 4.5 });
  path([['M', -10, 6], ['Q', 10, -6, 26, 14], ['Q', 6, 30, -10, 6]], { fill: GOLD, lw: 3.5 });
  path([['M', 32, -16], ['L', 52, -8], ['L', 32, 0]], { fill: ORANGE, lw: 3.5 });
  eye(16, -16, 4.5);
  path([['M', -2, -40], ['Q', 0, -58, 12, -52], ['Q', 8, -44, 10, -40]], { fill: LEAF, lw: 3.5 });
}
function catHead() {
  path([['M', -40, -6], ['L', -38, -52], ['L', -12, -32]], { fill: ORANGE, lw: 4 });
  path([['M', 40, -6], ['L', 38, -52], ['L', 12, -32]], { fill: ORANGE, lw: 4 });
  ell(0, 2, 44, 36, { fill: ORANGE, lw: 4.5 });
  line([[-8, -32], [-6, -18]], { lw: 3 }); line([[8, -32], [6, -18]], { lw: 3 });
  ell(0, 18, 18, 12, { fill: WHITE, lw: 3 });
  eye(-16, -2, 4.5); eye(16, -2, 4.5);
  path([['M', -4, 10], ['L', 4, 10], ['L', 0, 15]], { fill: NAVY, lw: 2 });
  for (const sx of [-1, 1]) { line([[sx * 22, 14], [sx * 50, 8]], { lw: 2.5 }); line([[sx * 22, 20], [sx * 50, 22]], { lw: 2.5 }); }
}
function dogHead() {
  ell(0, 0, 40, 38, { fill: WHITE, lw: 4.5 });
  path([['M', -32, -26], ['Q', -60, -24, -52, 14], ['Q', -36, 18, -32, -6]], { fill: NAVY, lw: 4, texDark: false });
  path([['M', 32, -26], ['Q', 60, -24, 52, 14], ['Q', 36, 18, 32, -6]], { fill: NAVY, lw: 4 });
  path([['M', 6, -36], ['Q', 30, -32, 26, -6], ['Q', 10, -8, 6, -36]], { fill: ORANGE, lw: 0, stroke: null, tex: false });
  eye(-14, -6, 5); eye(14, -6, 5);
  ell(0, 14, 9, 6.5, { fill: NAVY, lw: 2 });
  line(pathPts([['M', -10, 24], ['Q', 0, 32, 10, 24]]), { lw: 3 });
  path([['M', -4, 28], ['Q', 0, 40, 6, 28]], { fill: '#F39A9A', lw: 2.5 });
}
function chickenHead() { withT(-8, 14, 0.82, 0, () => chicken(1)); }
function duckHead() { withT(-6, 8, 0.85, 0, () => duck(1, 0)); }
const ANIMALS = [chickenHead, duckHead, cowHead, goatHead, rabbitHead, fishBubble, birdHead, catHead, dogHead];

function animalTile(i, size = 160) {
  rrect(-size / 2, -size / 2, size, size, size * 0.24, { fill: WHITE, lw: 5, shadow: 10, tex: false });
  withT(0, 4, size / 160, 0, ANIMALS[i % ANIMALS.length]);
}

/* ------------------------------ Maskot ------------------------------ */
// Badge bulat kuning berisi maskot anak ayam bertopi navy (pakai aset maskot asli)
function mascotBadge(r, t, wave = true) {
  const sway = wave ? Math.sin(t * 7) * 0.12 : 0;
  circle(0, 0, r, { fill: GOLD, lw: 5, shadow: 8 });
  circle(0, 0, r * 0.84, { stroke: WHITE, lw: 3, amp: 1.5 });
  if (IMG.mascot) {
    const im = IMG.mascot, h = r * 1.55, w = h * im.width / im.height;
    ctx.save();
    ctx.beginPath(); ctx.arc(0, 0, r * 0.92, 0, Math.PI * 2); ctx.rect(-r * 1.4, -r * 2.2, r * 2.8, r * 1.4); ctx.clip();
    ctx.translate(0, r * 0.85); ctx.rotate(sway);
    ctx.drawImage(im, -w / 2, -h + r * 0.12, w, h);
    ctx.restore();
  }
  if (wave) {
    const k = (Math.sin(t * 7) + 1) / 2;
    ctx.save(); ctx.globalAlpha *= 0.6 + k * 0.4;
    line(pathPts([['M', r * 0.95, -r * 0.75], ['Q', r * 1.2, -r * 0.6, r * 1.15, -r * 0.3]]), { lw: 4 });
    line(pathPts([['M', r * 1.1, -r * 0.95], ['Q', r * 1.45, -r * 0.7, r * 1.38, -r * 0.25]]), { lw: 4 });
    ctx.restore();
  }
}

/* ------------------------------ Produk ------------------------------ */
function feedSack(w = 120, h = 150, band = GOLD, icon = 'chicken') {
  path([['M', -w / 2, -h / 2 + 8], ['Q', -w / 2 - 10, -h / 2 - 14, -w / 2 + 14, -h / 2 - 6], ['Q', 0, -h / 2 + 8, w / 2 - 14, -h / 2 - 6],
  ['Q', w / 2 + 10, -h / 2 - 14, w / 2, -h / 2 + 8], ['Q', w / 2 + 8, 0, w / 2, h / 2 - 6], ['Q', 0, h / 2 + 8, -w / 2, h / 2 - 6], ['Q', -w / 2 - 8, 0, -w / 2, -h / 2 + 8]], { fill: WHITE, lw: 4.5, shadow: 6 });
  rrect(-w / 2 + 6, h * 0.12, w - 12, h * 0.2, 4, { fill: band, lw: 3.5 });
  line([[-w / 2 + 14, -h / 2 + 4], [w / 2 - 14, -h / 2 + 4]], { lw: 2.5 });
  if (icon === 'chicken') withT(0, -h * 0.12, w / 260, 0, () => chicken(1));
  else if (icon === 'fish') withT(0, -h * 0.1, w / 140, 0, () => { path([['M', -26, 0], ['Q', -6, -22, 18, -4], ['L', 32, -16], ['L', 30, 14], ['L', 18, 4], ['Q', -6, 22, -26, 0]], { fill: ORANGE, lw: 3.5 }); eye(-12, -3, 3); });
  else if (icon === 'leaf') withT(-w * .2, -h * .1, 1, -0.4, () => leafShape(w * .4, LEAF));
}
function fishBowl(r = 70) {
  path([['M', -r * .55, -r * .85], ['Q', -r * 1.15, -r * .2, -r * .7, r * .6], ['Q', 0, r * 1.05, r * .7, r * .6], ['Q', r * 1.15, -r * .2, r * .55, -r * .85]], { fill: 'rgba(214,230,250,0.9)', lw: 4.5, shadow: 6 });
  ell(0, -r * .85, r * .6, r * .12, { fill: WHITE, lw: 4 });
  line(pathPts([['M', -r * .85, -r * .2], ['Q', 0, -r * .05, r * .85, -r * .2]]), { lw: 3, stroke: '#7FA6D8' });
  withT(Math.sin(T * 2) * r * .15, r * .2, r / 90, Math.sin(T * 2.4) * .1, () => {
    path([['M', -26, 0], ['Q', -6, -22, 18, -4], ['L', 32, -16], ['L', 30, 14], ['L', 18, 4], ['Q', -6, 22, -26, 0]], { fill: ORANGE, lw: 4 }); eye(-12, -3, 3.5);
  });
  path([['M', -r * .3, r * .55], ['Q', -r * .35, r * .1, -r * .15, -r * .05], ['Q', -r * .2, r * .25, -r * .1, r * .55]], { fill: LEAF, lw: 3 });
}
function medicineBottle(s = 1) {
  ctx.save(); ctx.scale(s, s);
  rrect(-22, -100, 44, 26, 6, { fill: NAVY, lw: 4 });
  rrect(-18, -76, 36, 14, 3, { fill: WHITE, lw: 3.5 });
  path([['M', -18, -62], ['Q', -48, -54, -48, -20], ['L', -48, 64], ['Q', -48, 76, -36, 76], ['L', 36, 76], ['Q', 48, 76, 48, 64], ['L', 48, -20], ['Q', 48, -54, 18, -62], ['Z']], { fill: WHITE, lw: 4.5, shadow: 6 });
  rrect(-40, -10, 80, 58, 8, { fill: GOLD, lw: 3.5 });
  rrect(-7, -1, 14, 40, 3, { fill: NAVY, lw: 0, stroke: null, tex: false });
  rrect(-20, 12, 40, 14, 3, { fill: NAVY, lw: 0, stroke: null, tex: false });
  ctx.restore();
}
function capsule(s = 1) {
  ctx.save(); ctx.scale(s, s);
  path([['M', 0, -18], ['L', -30, -18], ['Q', -50, -18, -50, 0], ['Q', -50, 18, -30, 18], ['L', 0, 18], ['Z']], { fill: GOLD, lw: 4, shadow: 4 });
  path([['M', 0, -18], ['L', 30, -18], ['Q', 50, -18, 50, 0], ['Q', 50, 18, 30, 18], ['L', 0, 18], ['Z']], { fill: WHITE, lw: 4 });
  ctx.restore();
}
function syringe(s = 1) {
  ctx.save(); ctx.scale(s, s);
  rrect(-60, -16, 92, 32, 6, { fill: WHITE, lw: 4, shadow: 4 });
  rrect(-56, -12, 56, 24, 4, { fill: '#BFD3EE', lw: 0, stroke: null, tex: false });
  for (let i = 0; i < 4; i++) line([[-44 + i * 16, -16], [-44 + i * 16, -6]], { lw: 2.5 });
  rrect(32, -8, 14, 16, 3, { fill: NAVY, lw: 3 });
  line([[46, 0], [82, 0]], { lw: 3.5 });
  line([[-60, 0], [-84, 0]], { lw: 5 });
  rrect(-96, -18, 12, 36, 4, { fill: GOLD, lw: 3.5 });
  ctx.restore();
}
function egg(s = 1, crack = 0) {
  ctx.save(); ctx.scale(s, s);
  if (crack <= 0) {
    path([['M', 0, -52], ['Q', 40, -50, 40, 8], ['Q', 38, 48, 0, 48], ['Q', -38, 48, -40, 8], ['Q', -40, -50, 0, -52]], { fill: WHITE, lw: 4.5, shadow: 5 });
  } else {
    // bawah cangkang
    path([['M', -40, 0], ['L', -26, -12], ['L', -12, 0], ['L', 2, -14], ['L', 16, 0], ['L', 28, -12], ['L', 40, 0], ['Q', 38, 48, 0, 48], ['Q', -38, 48, -40, 0]], { fill: WHITE, lw: 4.5, shadow: 5 });
    // anak ayam muncul
    withT(0, -14 - crack * 10, 1, 0, () => {
      circle(0, 0, 26, { fill: GOLD, lw: 4 });
      eye(-8, -4, 3.5); eye(10, -4, 3.5);
      path([['M', -4, 4], ['L', 8, 6], ['L', -2, 12]], { fill: ORANGE, lw: 2.5 });
      line([[-2, -26], [2, -34], [6, -26]], { lw: 3 });
    });
    // tutup cangkang
    withT(10, -46 - crack * 18, 1, 0.5 * crack, () =>
      path([['M', -30, 6], ['Q', -26, -28, 6, -30], ['Q', 34, -26, 34, 6], ['L', 22, -4], ['L', 8, 8], ['L', -6, -4], ['L', -18, 8], ['Z']], { fill: WHITE, lw: 4 }));
  }
  ctx.restore();
}
function birdCage(s = 1) {
  ctx.save(); ctx.scale(s, s);
  rrect(-62, 60, 124, 20, 6, { fill: NAVY, lw: 4 });
  path([['M', -56, 60], ['L', -56, -10], ['Q', -56, -78, 0, -80], ['Q', 56, -78, 56, -10], ['L', 56, 60]], { fill: 'rgba(255,255,255,0.6)', lw: 4.5, closed: false });
  for (let i = -2; i <= 2; i++) line(pathPts([['M', i * 22, 60], ['L', i * 22, -10], ['Q', i * 14, -60, 0, -80]]), { lw: 3 });
  line(pathPts([['M', -56, 10], ['Q', 0, 18, 56, 10]]), { lw: 3 });
  circle(0, -92, 12, { lw: 4 });
  line([[-40, 30], [40, 30]], { lw: 4, stroke: '#8A5A2B' });
  withT(4, 8, .45, 0, birdHead);
  ctx.restore();
}
function feeder(s = 1) {
  ctx.save(); ctx.scale(s, s);
  path([['M', -24, -70], ['L', 24, -70], ['L', 24, 30], ['L', -24, 30], ['Z']], { fill: WHITE, lw: 4.5, shadow: 5 });
  ctx.save(); ctx.globalAlpha *= .9; rrect(-20, -20, 40, 48, 3, { fill: GOLD, lw: 0, stroke: null }); ctx.restore();
  for (let i = 0; i < 6; i++) dot(-12 + (i % 3) * 12, -8 + Math.floor(i / 3) * 16, 3, ORANGE2);
  ell(0, -72, 30, 9, { fill: NAVY, lw: 4 });
  path([['M', -56, 30], ['L', 56, 30], ['Q', 50, 58, 0, 58], ['Q', -50, 58, -56, 30]], { fill: NAVY, lw: 4 });
  ctx.restore();
}
function drinker(s = 1) {
  ctx.save(); ctx.scale(s, s);
  line([[0, -100], [0, -78]], { lw: 4 });
  path([['M', -10, -78], ['Q', -44, -60, -46, 20], ['L', 46, 20], ['Q', 44, -60, 10, -78], ['Z']], { fill: WHITE, lw: 4.5, shadow: 5 });
  ctx.save(); ctx.globalAlpha *= .8; path([['M', -40, -6], ['L', 40, -6], ['L', 44, 18], ['L', -44, 18], ['Z']], { fill: '#BFD3EE', lw: 0, stroke: null, tex: false }); ctx.restore();
  path([['M', -66, 20], ['L', 66, 20], ['Q', 60, 46, 0, 46], ['Q', -60, 46, -66, 20]], { fill: GOLD, lw: 4.5 });
  ctx.restore();
}

/* ------------------------------ Kendaraan ------------------------------ */
function truck(t) {
  // badan truk ~ 460 x 200, pusat di roda
  const wheel = (x) => withT(x, 0, 1, t * 9, () => { circle(0, 0, 30, { fill: NAVY, lw: 4 }); circle(0, 0, 12, { fill: WHITE, lw: 3 }); line([[-10, 0], [10, 0]], { lw: 3 }); });
  // bak
  rrect(-230, -160, 290, 130, 10, { fill: WHITE, lw: 5, shadow: 8 });
  // karung muatan
  const bob = Math.sin(t * 14) * 1.5;
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4 - r; c++) withT(-190 + c * 66 + r * 33, -186 - r * 44 + bob, 1, 0, () => feedSack(62, 50, c % 2 ? GOLD : WHITE, 'none'));
  rrect(-222, -100, 274, 16, 4, { fill: GOLD, lw: 3.5 });
  // kabin
  path([['M', 66, -30], ['L', 66, -140], ['L', 150, -140], ['Q', 176, -140, 190, -100], ['L', 214, -70], ['Q', 224, -60, 224, -44], ['L', 224, -30], ['Z']], { fill: NAVY, lw: 5, shadow: 8 });
  path([['M', 90, -126], ['L', 146, -126], ['Q', 160, -126, 170, -104], ['L', 184, -80], ['L', 90, -80], ['Z']], { fill: '#CFE0F5', lw: 3.5 });
  rrect(206, -56, 18, 12, 3, { fill: GOLD, lw: 2.5 });
  rrect(-236, -36, 466, 18, 6, { fill: NAVY, lw: 4 });
  wheel(-160); wheel(-70); wheel(160);
  // asap
  for (let i = 0; i < 3; i++) {
    const k = ((t * 1.6 + i / 3) % 1);
    ctx.save(); ctx.globalAlpha *= (1 - k) * .8;
    circle(-260 - k * 80, -30 - k * 30, 8 + k * 18, { fill: WHITE, lw: 3 });
    ctx.restore();
  }
}

/* ------------------------------ Gadget ------------------------------ */
function laptopFrame(sw, sh) {
  // frame hand-drawn; layar pada (-sw/2,-sh/2,sw,sh)
  const b = 26;
  rrect(-sw / 2 - b, -sh / 2 - b, sw + b * 2, sh + b * 2, 26, { fill: NAVY, lw: 6, shadow: 14 });
  dot(0, -sh / 2 - b / 2, 4, '#5D7BB3');
  // alas
  path([['M', -sw / 2 - b - 10, sh / 2 + b], ['L', sw / 2 + b + 10, sh / 2 + b], ['L', sw / 2 + b + 90, sh / 2 + b + 44], ['Q', sw / 2 + b + 96, sh / 2 + b + 62, sw / 2 + b + 70, sh / 2 + b + 62],
  ['L', -sw / 2 - b - 70, sh / 2 + b + 62], ['Q', -sw / 2 - b - 96, sh / 2 + b + 62, -sw / 2 - b - 90, sh / 2 + b + 44], ['Z']], { fill: WHITE, lw: 6, shadow: 10 });
  rrect(-110, sh / 2 + b + 10, 220, 18, 8, { fill: '#E3E8F2', lw: 3.5 });
}
function phoneFrame(sw, sh) {
  const b = 16;
  rrect(-sw / 2 - b, -sh / 2 - b, sw + b * 2, sh + b * 2, 46, { fill: NAVY, lw: 6, shadow: 14 });
}
function drawScreen(im, sx, sy, sw, sh, x, y, w, h, r) {
  ctx.save();
  ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h); ctx.clip();
  ctx.fillStyle = WHITE; ctx.fillRect(x, y, w, h);
  if (im) ctx.drawImage(im, sx, sy, sw, sh, x, y, w, h);
  // kilau layar
  const g = ctx.createLinearGradient(x, y, x + w, y + h);
  g.addColorStop(0, 'rgba(255,255,255,0.10)'); g.addColorStop(.45, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(255,255,255,0.04)');
  ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
  ctx.restore();
}
function cursorHand(press = 0) {
  ctx.save(); ctx.scale(1 - press * .12, 1 - press * .12);
  path([['M', 0, 0], ['L', 0, 62], ['L', 15, 48], ['L', 27, 74], ['L', 39, 68], ['L', 27, 43], ['L', 46, 42], ['Z']], { fill: WHITE, lw: 5, shadow: 6 });
  ctx.restore();
}
function cartIcon(s = 1) {
  ctx.save(); ctx.scale(s, s);
  circle(0, 0, 44, { fill: WHITE, lw: 4.5, shadow: 6 });
  line([[-26, -18], [-16, -18], [-6, 12], [20, 12], [26, -8], [-12, -8]], { lw: 4.5 });
  circle(-2, 22, 4.5, { fill: NAVY, lw: 2 }); circle(16, 22, 4.5, { fill: NAVY, lw: 2 });
  ctx.restore();
}
function waBubble(k) {
  // gelembung chat ala WhatsApp (tanpa teks, hanya titik mengetik)
  ctx.save(); ctx.scale(k, k);
  path([['M', -110, -60], ['L', 110, -60], ['Q', 130, -60, 130, -40], ['L', 130, 20], ['Q', 130, 40, 110, 40], ['L', -60, 40], ['L', -100, 70], ['L', -88, 40], ['L', -110, 40], ['Q', -130, 40, -130, 20], ['L', -130, -40], ['Q', -130, -60, -110, -60]],
    { fill: '#DCF8C6', lw: 5, shadow: 10 });
  // ikon telepon WA
  withT(-80, -10, 1, 0, () => {
    circle(0, 0, 30, { fill: '#25D366', lw: 4 });
    path([['M', -12, -14], ['Q', -16, 8, 12, 16], ['L', 16, 8], ['L', 8, 2], ['L', 4, 8], ['Q', -6, 2, -8, -6], ['L', -2, -10], ['L', -6, -18], ['Z']], { fill: WHITE, lw: 2.5 });
  });
  for (let i = 0; i < 3; i++) {
    const b = Math.sin(T * 10 - i * 0.9) * 5;
    dot(-10 + i * 40, -10 + b, 9, NAVY);
  }
  ctx.restore();
}
function iconPhone() { path([['M', -10, -14], ['Q', -14, 8, 10, 14], ['L', 14, 6], ['L', 6, 0], ['L', 2, 6], ['Q', -6, 0, -6, -6], ['L', 0, -10], ['L', -4, -18], ['Z']], { fill: GOLD, lw: 3 }); }
function iconPin() { path([['M', 0, 18], ['Q', -16, 0, -14, -8], ['Q', -12, -20, 0, -20], ['Q', 12, -20, 14, -8], ['Q', 16, 0, 0, 18]], { fill: GOLD, lw: 3 }); circle(0, -7, 5, { fill: NAVY, lw: 2 }); }
function iconClock() { circle(0, 0, 16, { fill: GOLD, lw: 3 }); line([[0, -9], [0, 0], [7, 4]], { lw: 3 }); }
function iconGlobe() { circle(0, 0, 16, { fill: GOLD, lw: 3 }); ell(0, 0, 7, 16, { lw: 2.5 }); line([[-16, 0], [16, 0]], { lw: 2.5 }); }
