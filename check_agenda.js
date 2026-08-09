import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Evaluate in page to bypass login
    await page.addInitScript(() => {
        window.localStorage.setItem('ps_auth', 'true');
        window.localStorage.setItem('ps_role', 'CHAPTER HEAD');
    });

    await page.goto('http://localhost:3000/mfc-youth-tarlac-portal/');
    await page.waitForTimeout(2000);

    try {
        await page.click('[data-view="agenda"]', { timeout: 2000 });
        await page.waitForTimeout(1000);
    } catch (_e) {
        console.log('Could not click agenda tab');
    }

    const isVisible = await page.evaluate(() => {
        const el = document.getElementById('agenda-table-container');
        return el ? window.getComputedStyle(el).display : 'null';
    });

    console.log('agenda-table-container display:', isVisible);

    await browser.close();
})();
