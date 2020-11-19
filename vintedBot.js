const puppeteer = require("puppeteer");
const { createAd } = require("./wallabot");

async function getVinted() {
  const args = [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-infobars',
    '--window-position=0,0',
    '--ignore-certifcate-errors',
    '--ignore-certifcate-errors-spki-list',
    '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
  ];

  const options = {
    args,
    headless: false,
    defaultViewport: null,
    ignoreHTTPSErrors: true,
    userDataDir: './tmp',
    dumpio: true,
    devtools: false,
  };

  /* const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    userDataDir: "./user_data",
  }); */
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'es',
  });
  const url = 'https://web.wallapop.com/catalog/upload';
  // const url2 = 'https://web.wallapop.com';

  await page.goto(url);
  await createAd(page);
  // SUBMIT PRODUCT
  /*  await page.waitForSelector('input[type=submit]');

  const submitButton = await page.$('input[type=submit]');
  if (submitButton) {
    await Promise.all([page.waitForNavigation(), submitButton.click()]);
  } */
  // END SUBMIT PRODUCT
}

getVinted();
