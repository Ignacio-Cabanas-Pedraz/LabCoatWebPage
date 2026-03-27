from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("file:///Users/nachocabanas/Coding/LabCoatWebPage/v2/index.html")
        page.wait_for_timeout(2000)
        page.screenshot(path="screenshot.png")
        browser.close()

run()
