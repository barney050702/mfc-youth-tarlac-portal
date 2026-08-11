const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    page.on('console', (msg) => {
        console.log(`PAGE LOG [${msg.type()}]:`, msg.text());
    });

    page.on('pageerror', (err) => {
        console.error('PAGE ERROR:', err.toString());
    });

    page.on('requestfailed', (request) => {
        console.error('REQUEST FAILED:', request.url(), request.failure().errorText);
    });

    console.log('Navigating to local dev server...');
    try {
        await page.goto('http://localhost:4173/mfc-youth-tarlac-portal/', {
            waitUntil: 'networkidle2',
        });
        console.log('Navigation finished.');
    } catch (e) {
        console.error('Navigation error:', e);
    }

    await browser.close();
})();
