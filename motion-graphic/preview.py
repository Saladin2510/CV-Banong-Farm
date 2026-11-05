"""Render beberapa frame pratinjau ke PNG untuk QA visual.
Contoh: python preview.py 2.8 9 16 30 36 47 57
"""
import sys, base64, time
from pathlib import Path
from playwright.sync_api import sync_playwright

HERE = Path(__file__).parent
OUT = HERE / "preview"
OUT.mkdir(exist_ok=True)
times = [float(x) for x in sys.argv[1:]] or [2.8, 9, 16, 30, 36, 47, 57]

with sync_playwright() as p:
    b = p.chromium.launch(args=["--allow-file-access-from-files"])
    pg = b.new_page(viewport={"width": 1920, "height": 1080})
    logs = []
    pg.on("console", lambda m: logs.append(m.text))
    pg.on("pageerror", lambda e: logs.append("ERR " + str(e)))
    pg.goto((HERE / "index.html").as_uri() + "?t=0")
    pg.evaluate("window.READY")
    for t in times:
        t0 = time.time()
        data = pg.evaluate(f"window.grabFrame({t}, 0.9)")
        dt = time.time() - t0
        (OUT / f"f_{t:05.2f}.jpg").write_bytes(base64.b64decode(data.split(",", 1)[1]))
        print(f"t={t} {dt*1000:.0f}ms")
    b.close()
for l in logs:
    print(l)
