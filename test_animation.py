import urllib.request
import os
import subprocess

# Install playwright if not present
try:
    import playwright
except ImportError:
    subprocess.run(["pip3", "install", "playwright"])
    subprocess.run(["playwright", "install", "chromium"])

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("file:///Users/nachocabanas/Coding/LabCoatWebPage/v2/index.html")
    
    # Wait for font load
    page.wait_for_timeout(1000)
    page.screenshot(path="screenshot1.png")
    
    # Wait for slide
    page.wait_for_timeout(2000)
    page.screenshot(path="screenshot2.png")
    
    browser.close()
    print("Screenshots taken.")

