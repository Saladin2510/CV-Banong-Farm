/* =====================================================================
   CV Banong Farms – Motion Graphic Engine (hand-drawn 2D, canvas)
   Semua gambar dibuat deterministik dari waktu t (detik) -> render(t)
   ===================================================================== */
'use strict';

const W = 1920, H = 1080;
const NAVY = '#0B1F4B', GOLD = '#FFD60A', WHITE = '#FFFFFF', PAPER = '#F7F8FA';
const NAVY2 = '#16326E', GOLD2 = '#F2C400', LEAF = '#6BAA4A', ORANGE = '#F59A2E', ORANGE2 = '#E8792A';
const F_HEAD = '"Fredoka", "Segoe UI", sans-serif';
const F_HAND = '"Patrick Hand", "Segoe Print", cursive';
const F_SCRIPT = '"Caveat", "Segoe Print", cursive';

let ctx = null;
let T = 0;          // waktu global
let BOIL = 0;       // indeks "line boil" (12 fps)
let SID = 0;        // id shape otomatis (reset tiap frame)
const IMG = {};
const TEX = {};

/* ---------------------------- Utilitas ---------------------------- */
function hash(n) {
  n = n | 0;
  n = Math.imul(n ^ (n >>> 15), 0x2c1b3c6d);
  n = Math.imul(n ^ (n >>> 12), 0x297a2d39);
  n ^= n >>> 15;
  return (n >>> 0) / 4294967296;
}
function hash2(a, b) { return hash(Math.imul(a | 0, 73856093) ^ Math.imul(b | 0, 19349663)); }
function vnoise(x, seed) {
  const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f);
  return (hash2(i, seed) * (1 - u) + hash2(i + 1, seed) * u) * 2 - 1;
}
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, k) => a + (b - a) * k;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const E = {
  inOut: k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2,
  out: k => 1 - Math.pow(1 - k, 3),
  in: k => k * k * k,
  outBack: (k, s = 1.70158) => { const c3 = s + 1; return 1 + c3 * Math.pow(k - 1, 3) + s * Math.pow(k - 1, 2); },
  outElastic: k => k === 0 ? 0 : k === 1 ? 1 : Math.pow(2, -10 * k) * Math.sin((k * 10 - .75) * (2 * Math.PI / 3)) + 1,
  sine: k => -(Math.cos(Math.PI * k) - 1) / 2,
};
// pop 0..1 with overshoot
const pop = (t, a, d = .55) => E.outBack(prog(t, a, a + d), 2.2);
const popEl = (t, a, d = .9) => E.outElastic(prog(t, a, a + d));

/* ------------------------- Titik & bentuk ------------------------- */
function ellipsePts(cx, cy, rx, ry, n) {
  n = n || Math.max(18, Math.round((rx + ry) * 0.22));
  const p = [];
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; p.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]); }
  return p;
}
function resample(pts, closed, step = 12) {
  const out = [];
  const N = pts.length, M = closed ? N : N - 1;
  for (let i = 0; i < M; i++) {
    const a = pts[i], b = pts[(i + 1) % N];
    const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const k = Math.max(1, Math.ceil(d / step));
    for (let j = 0; j < k; j++) out.push([lerp(a[0], b[0], j / k), lerp(a[1], b[1], j / k)]);
  }
  if (!closed) out.push(pts[N - 1]);
  return out;
}
function rrectPts(x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  const p = [];
  const arc = (cx, cy, a0) => { for (let i = 0; i <= 5; i++) { const a = a0 + i / 5 * Math.PI / 2; p.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } };
  arc(x + w - r, y + r, -Math.PI / 2); arc(x + w - r, y + h - r, 0); arc(x + r, y + h - r, Math.PI / 2); arc(x + r, y + r, Math.PI);
  return resample(p, true, 14);
}
// path sederhana: [['M',x,y],['L',x,y],['Q',cx,cy,x,y],['C',c1x,c1y,c2x,c2y,x,y]]
function pathPts(cmds, step = 10) {
  const p = []; let cx = 0, cy = 0;
  for (const c of cmds) {
    if (c[0] === 'M') { cx = c[1]; cy = c[2]; p.push([cx, cy]); }
    else if (c[0] === 'L') {
      const d = Math.hypot(c[1] - cx, c[2] - cy), k = Math.max(1, Math.ceil(d / step));
      for (let j = 1; j <= k; j++) p.push([lerp(cx, c[1], j / k), lerp(cy, c[2], j / k)]);
      cx = c[1]; cy = c[2];
    } else if (c[0] === 'Q') {
      const d = Math.hypot(c[3] - cx, c[4] - cy) + 1, k = Math.max(3, Math.ceil(d / step));
      for (let j = 1; j <= k; j++) { const u = j / k, v = 1 - u; p.push([v * v * cx + 2 * v * u * c[1] + u * u * c[3], v * v * cy + 2 * v * u * c[2] + u * u * c[4]]); }
      cx = c[3]; cy = c[4];
    } else if (c[0] === 'C') {
      const d = Math.hypot(c[5] - cx, c[6] - cy) + 1, k = Math.max(4, Math.ceil(d / step));
      for (let j = 1; j <= k; j++) {
        const u = j / k, v = 1 - u;
        p.push([v * v * v * cx + 3 * v * v * u * c[1] + 3 * v * u * u * c[3] + u * u * u * c[5],
        v * v * v * cy + 3 * v * v * u * c[2] + 3 * v * u * u * c[4] + u * u * u * c[6]]);
      }
      cx = c[5]; cy = c[6];
    }
  }
  return p;
}
// goyangan tangan (line boil)
function wob(pts, amp, seed) {
  const b = BOIL * 131 + seed * 977;
  return pts.map((q, i) => [q[0] + amp * vnoise(i * 0.33, b), q[1] + amp * vnoise(i * 0.33, b + 5003)]);
}
function tracePath(pts, closed) {
  const n = pts.length;
  ctx.beginPath();
  if (n < 3) { ctx.moveTo(pts[0][0], pts[0][1]); if (n > 1) ctx.lineTo(pts[1][0], pts[1][1]); return; }
  if (closed) {
    const m0 = [(pts[n - 1][0] + pts[0][0]) / 2, (pts[n - 1][1] + pts[0][1]) / 2];
    ctx.moveTo(m0[0], m0[1]);
    for (let i = 0; i < n; i++) {
      const a = pts[i], b = pts[(i + 1) % n];
      ctx.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
    }
    ctx.closePath();
  } else {
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < n - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      ctx.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
    }
    ctx.lineTo(pts[n - 1][0], pts[n - 1][1]);
  }
}
/**
 * Gambar bentuk hand-drawn.
 * o: {fill, stroke, lw, closed, shadow, tex, amp, reveal, alpha}
 */
function shape(pts, o = {}) {
  const id = ++SID;
  const closed = o.closed !== false;
  const amp = o.amp ?? 2.2;
  const lw = o.lw ?? 5;
  const a0 = ctx.globalAlpha;
  if (o.alpha !== undefined) ctx.globalAlpha = a0 * o.alpha;
  if (o.fill && closed) {
    const fp = wob(pts, amp * 0.8, id * 3 + 1);
    if (o.shadow) {
      ctx.save();
      ctx.translate(o.shadow * 0.55, o.shadow);
      ctx.fillStyle = 'rgba(11,31,75,0.16)';
      tracePath(fp, true); ctx.fill();
      ctx.translate(-o.shadow * 0.25, -o.shadow * 0.45);
      ctx.fillStyle = 'rgba(11,31,75,0.10)';
      tracePath(fp, true); ctx.fill();
      ctx.restore();
    }
    ctx.save();
    ctx.translate(1.6, 1.2); // misregistrasi cetak / cut-out
    tracePath(fp, true);
    ctx.fillStyle = o.fill; ctx.fill();
    if (o.tex !== false && TEX.crayon) {
      ctx.clip();
      ctx.globalAlpha = ctx.globalAlpha * (o.texA ?? 0.5);
      ctx.fillStyle = (o.texDark ? TEX.crayonDarkPat : TEX.crayonPat);
      ctx.fillRect(-4000, -4000, 8000, 8000);
    }
    ctx.restore();
  }
  if (o.stroke !== null && lw > 0) {
    let sp = wob(pts, amp, id * 3 + 2);
    if (o.reveal !== undefined && o.reveal < 1) {
      const k = Math.floor(sp.length * clamp(o.reveal));
      if (k < 2) { ctx.globalAlpha = a0; return; }
      sp = sp.slice(0, k);
      tracePath(sp, false);
    } else tracePath(sp, closed);
    ctx.strokeStyle = o.stroke || NAVY;
    ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.stroke();
  }
  ctx.globalAlpha = a0;
}
function line(pts, o = {}) { shape(pts, Object.assign({ closed: false }, o)); }
function circle(x, y, r, o) { shape(ellipsePts(x, y, r, r), o); }
function ell(x, y, rx, ry, o) { shape(ellipsePts(x, y, rx, ry), o); }
function rrect(x, y, w, h, r, o) { shape(rrectPts(x, y, w, h, r), o); }
function poly(arr, o) { shape(resample(arr, o?.closed !== false, 12), o); }
function path(cmds, o) { shape(pathPts(cmds), o); }
function dot(x, y, r, c = NAVY) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = c; ctx.fill(); }

function withT(x, y, s, r, fn, alpha) {
  ctx.save(); ctx.translate(x, y); if (r) ctx.rotate(r); if (s !== 1) ctx.scale(s, s);
  if (alpha !== undefined) ctx.globalAlpha *= alpha;
  fn(); ctx.restore();
}

/* ------------------------------ Teks ------------------------------ */
const _mw = {};
function charW(font, ch) { const k = font + '|' + ch; if (_mw[k] === undefined) { ctx.font = font; _mw[k] = ctx.measureText(ch).width; } return _mw[k]; }
function textW(str, font, ls = 0) { let w = 0; for (const ch of str) w += charW(font, ch) + ls; return w - ls; }
/**
 * Teks hand-lettered: per-karakter goyang halus + efek "writes on" (pop per huruf)
 * o: {font, size, weight, color, align, reveal(0..1), ls, outline, outlineW, jit, shadow}
 */
function htext(str, x, y, o = {}) {
  const size = o.size || 60;
  const font = `${o.weight || 600} ${size}px ${o.family || F_HEAD}`;
  const ls = o.ls ?? 0;
  const chars = [...str];
  const tw = textW(str, font, ls);
  let cx = x;
  if ((o.align || 'center') === 'center') cx = x - tw / 2; else if (o.align === 'right') cx = x - tw;
  const rev = o.reveal ?? 1;
  const n = chars.length;
  const jit = o.jit ?? 1;
  ctx.font = font; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
  const id = ++SID;
  for (let i = 0; i < n; i++) {
    const ch = chars[i];
    const w = charW(font, ch);
    // tiap huruf muncul berurutan dengan pop
    const k = clamp(rev * (n + 3) - i, 0, 3) / 3;   // 0..1 untuk huruf ini
    if (k > 0 && ch !== ' ') {
      const s = E.outBack(k, 2.6);
      const rot = (hash2(i + id * 31, BOIL) - .5) * 0.06 * jit;
      const dy = (hash2(i + id * 17, BOIL + 999) - .5) * 3 * jit;
      ctx.save();
      ctx.translate(cx + w / 2, y + dy - size * 0.3);
      ctx.rotate(rot); ctx.scale(s, s);
      ctx.globalAlpha *= clamp(k * 3);
      if (o.shadow) { ctx.fillStyle = o.shadow; ctx.fillText(ch, -w / 2 + size * 0.04, size * 0.3 + size * 0.06); }
      if (o.outline) {
        ctx.lineJoin = 'round'; ctx.strokeStyle = o.outline; ctx.lineWidth = o.outlineW || size * 0.14;
        ctx.strokeText(ch, -w / 2, size * 0.3);
      }
      ctx.fillStyle = o.color || NAVY;
      ctx.fillText(ch, -w / 2, size * 0.3);
      ctx.restore();
    }
    cx += w + ls;
  }
  return tw;
}
// sapuan stabilo kuning di bawah teks
function marker(x, y, w, h, k, color = GOLD, seed = 0) {
  if (k <= 0) return;
  const id = ++SID + seed;
  const pts = [];
  const ww = w * k;
  pts.push([x, y]);
  for (let i = 0; i <= 10; i++) pts.push([x + ww * i / 10, y - h / 2 + vnoise(i * .7, id + BOIL * 7) * 3]);
  for (let i = 10; i >= 0; i--) pts.push([x + ww * i / 10, y + h / 2 + vnoise(i * .7, id + 77 + BOIL * 7) * 3]);
  ctx.save(); ctx.globalAlpha *= 0.95;
  tracePath(pts, true); ctx.fillStyle = color; ctx.fill();
  ctx.clip(); ctx.globalAlpha *= .45; ctx.fillStyle = TEX.crayonPat; ctx.fillRect(x - 10, y - h, w + 20, h * 2);
  ctx.restore();
}

/* --------------------------- Tekstur --------------------------- */
function makeTextures() {
  // butiran kertas (overlay)
  const g = document.createElement('canvas'); g.width = W; g.height = H;
  const gc = g.getContext('2d');
  const id = gc.createImageData(W, H); const d = id.data;
  let s = 12345;
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  for (let i = 0; i < W * H; i++) {
    const x = i % W, y = (i / W) | 0;
    let v = 128 + (rnd() - .5) * 46;
    v += 10 * Math.sin(x * 0.013 + Math.sin(y * 0.007) * 3) * Math.sin(y * 0.011);
    d[i * 4] = d[i * 4 + 1] = d[i * 4 + 2] = v; d[i * 4 + 3] = 255;
  }
  gc.putImageData(id, 0, 0);
  // serat kertas
  gc.globalAlpha = .07; gc.strokeStyle = '#000'; gc.lineWidth = 1;
  for (let i = 0; i < 2600; i++) {
    const x = rnd() * W, y = rnd() * H, a = rnd() * Math.PI, l = 6 + rnd() * 26;
    gc.beginPath(); gc.moveTo(x, y); gc.quadraticCurveTo(x + Math.cos(a) * l * .5 + 3, y + Math.sin(a) * l * .5 - 3, x + Math.cos(a) * l, y + Math.sin(a) * l); gc.stroke();
  }
  gc.globalAlpha = .08; gc.strokeStyle = '#fff';
  for (let i = 0; i < 1600; i++) {
    const x = rnd() * W, y = rnd() * H, a = rnd() * Math.PI, l = 6 + rnd() * 20;
    gc.beginPath(); gc.moveTo(x, y); gc.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); gc.stroke();
  }
  TEX.grain = g;

  // goresan crayon / gouache untuk isian
  const mk = (light) => {
    const c = document.createElement('canvas'); c.width = c.height = 360;
    const k = c.getContext('2d');
    for (let i = 0; i < 900; i++) {
      const x = rnd() * 360, y = rnd() * 360, l = 8 + rnd() * 26, a = -0.9 + (rnd() - .5) * .35;
      k.strokeStyle = light ? `rgba(255,255,255,${0.10 + rnd() * 0.22})` : `rgba(11,31,75,${0.05 + rnd() * 0.10})`;
      k.lineWidth = 1 + rnd() * 2.2; k.lineCap = 'round';
      k.beginPath(); k.moveTo(x, y); k.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); k.stroke();
    }
    for (let i = 0; i < 2200; i++) {
      k.fillStyle = light ? `rgba(255,255,255,${rnd() * .25})` : `rgba(11,31,75,${rnd() * .12})`;
      k.fillRect(rnd() * 360, rnd() * 360, 1 + rnd() * 2, 1 + rnd() * 2);
    }
    return c;
  };
  TEX.crayon = mk(true); TEX.crayonDark = mk(false);
  TEX.crayonPat = ctx.createPattern(TEX.crayon, 'repeat');
  TEX.crayonDarkPat = ctx.createPattern(TEX.crayonDark, 'repeat');

  // vignette
  const v = document.createElement('canvas'); v.width = W; v.height = H;
  const vc = v.getContext('2d');
  const rg = vc.createRadialGradient(W / 2, H / 2, H * 0.45, W / 2, H / 2, H * 1.05);
  rg.addColorStop(0, 'rgba(11,31,75,0)'); rg.addColorStop(1, 'rgba(11,31,75,0.20)');
  vc.fillStyle = rg; vc.fillRect(0, 0, W, H);
  TEX.vignette = v;
}

function loadImage(name, src) {
  return new Promise((res, rej) => { const im = new Image(); im.onload = () => { IMG[name] = im; res(); }; im.onerror = () => { console.warn('missing', src); res(); }; im.src = src; });
}
