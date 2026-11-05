"""Ambil screenshot website localhost (vite dev) untuk dipakai di scene Website Showcase.
Jalankan dulu: npx vite --port 5199
"""
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

URL = "http://localhost:5199/"
OUT = Path(__file__).parent / "assets"
OUT.mkdir(exist_ok=True)


def warm_scroll(page, step=500, pause=0.25):
    """Scroll pelan ke bawah supaya semua animasi reveal/lazy image ke-trigger."""
    h = page.evaluate("document.documentElement.scrollHeight")
    y = 0
    while y < h:
        page.mouse.wheel(0, step)
        time.sleep(pause)
        y += step
        h = page.evaluate("document.documentElement.scrollHeight")
    time.sleep(1.0)
    page.evaluate("window.scrollTo(0,0)")
    time.sleep(1.5)


with sync_playwright() as p:
    browser = p.chromium.launch()

    # ---------- DESKTOP ----------
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1.5)
    page = ctx.new_page()
    page.goto(URL, wait_until="load", timeout=60000)
    time.sleep(3)
    warm_scroll(page)
    page.screenshot(path=str(OUT / "site_desktop_hero.png"))

    # Potongan per-section (scroll ke anchor, screenshot viewport)
    for sel, name in [("#katalog-produk", "site_desktop_catalog"),
                      ("#contact", "site_desktop_contact")]:
        try:
            page.evaluate(f"document.querySelector('{sel}').scrollIntoView({{block:'start'}})")
            time.sleep(2.0)
            page.screenshot(path=str(OUT / f"{name}.png"))
        except Exception as e:  # section mungkin tidak ada
            print("skip", sel, e)

    # Full page panjang untuk efek scroll di laptop
    page.evaluate("window.scrollTo(0,0)")
    time.sleep(1.5)
    page.screenshot(path=str(OUT / "site_desktop_full.png"), full_page=True)
    ctx.close()

    # ---------- MOBILE ----------
    ctx = browser.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2,
                              is_mobile=True, has_touch=True)
    page = ctx.new_page()
    page.goto(URL, wait_until="load", timeout=60000)
    time.sleep(3)
    warm_scroll(page, step=400)
    page.screenshot(path=str(OUT / "site_mobile_hero.png"))
    try:
        page.evaluate("document.querySelector('#katalog-produk').scrollIntoView({block:'start'})")
        time.sleep(2.0)
        page.screenshot(path=str(OUT / "site_mobile_catalog.png"))
    except Exception as e:
        print("skip mobile catalog", e)
    ctx.close()
    browser.close()

print("done")
