const puppeteer = require('puppeteer');
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function crawlPage(url) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
        ignoreHTTPSErrors: true,
        defaultViewport: null,
        ignoreDefaultArgs: ['--disable-extensions'],
        args: ['--disable-extensions'],
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    });
    await delay(2000); 
    const page = await browser.newPage();

    await page.goto(url);


    const displayImageDetail = await page.content();
    // const displayImageDetail = await page.$eval('#display_image_detail', (element) => {
    //     return element.textContent;
    // });

    console.log(`HTML content for URL ${url}:`);
    console.log(displayImageDetail);
    console.log("=".repeat(30));

    await browser.close();
}
const baseUrl = 'https://hentai-img.com/image/pixiv-lumieres-34097561-ai-generated/page/141/';
crawlPage(baseUrl);
