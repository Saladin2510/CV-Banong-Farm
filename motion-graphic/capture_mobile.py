import time
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image

OUT = Path(__file__).parent / "assets"
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, is_mobile=True, has_touch=True)
    pg = ctx.new_page()
    pg.goto("http://localhost:5199/", wait_until="load", timeout=60000)
    time.sleep(2.2)
    pg.screenshot(path=str(OUT / "site_mobile_hero.png"))
    b.close()

im = Image.open(OUT / "site_desktop_full.png")
im.resize((im.width // 6, im.height // 6)).save(OUT.parent / "full_preview.png")
print("ok")
