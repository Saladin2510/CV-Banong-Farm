"""Siapkan aset brand: logo (sudah transparan) & maskot (hapus latar putih + bubble)."""
from pathlib import Path
import shutil
import numpy as np
import cv2
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = Path(__file__).parent / "assets"
OUT.mkdir(exist_ok=True)

# Logo resmi
shutil.copy(ROOT / "public/assets/logo.png", OUT / "logo.png")

# Maskot: latar putih -> transparan (flood fill dari tepi), buang komponen kecil (speech bubble)
im = np.array(Image.open(ROOT / "public/assets/mascot.png").convert("RGB"))
h, w = im.shape[:2]
near_white = (im.min(axis=2) > 235).astype(np.uint8)
# flood fill background terhubung dengan tepi
mask = np.zeros((h + 2, w + 2), np.uint8)
bg = near_white.copy()
cv2.floodFill(bg, mask, (0, 0), 2)
background = (bg == 2)
fg = (~background).astype(np.uint8)
# simpan hanya komponen terbesar (badan maskot)
n, labels, stats, _ = cv2.connectedComponentsWithStats(fg, 8)
biggest = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
keep = (labels == biggest)
# isi lubang di dalam badan (mata dll yang putih tetap putih)
alpha = keep.astype(np.uint8) * 255
alpha = cv2.GaussianBlur(alpha, (3, 3), 0)
rgba = np.dstack([im, alpha])
ys, xs = np.where(keep)
pad = 10
crop = rgba[max(0, ys.min() - pad):ys.max() + pad, max(0, xs.min() - pad):xs.max() + pad]
Image.fromarray(crop).save(OUT / "mascot.png")
print("mascot", crop.shape)
