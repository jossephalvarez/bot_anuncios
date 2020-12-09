const puppeteer = require("puppeteer");
const { createAd } = require("./wallabot");
const { getRandomIntBetween, delay } = require('./utils/funcs');
const adInformation = require('./adInformation/wallapop/information.json');

async function startBot() {
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

  /*  const urlChat = 'https://web.wallapop.com/chat';
  await page.goto(urlChat); */

  console.log('FINISH');

  // // TODO jalvarezv Aqui deberia haner un bucle random de poner 1 o 2 ( sin salir ) y pasandole el OBJETO que tiene que poner
  const urlUpload = "https://web.wallapop.com/catalog/upload";
  await page.goto(urlUpload);
  await createAd(page, adInformation[0]);
  await delay(getRandomIntBetween(400, 1000));
  /*  await page.goto(urlUpload);
  await createAd(page, adInformation[1]); */

  // TODO JALVAREZ SCHEDULING CRON JOB
  // https://levelup.gitconnected.com/building-a-scheduled-news-crawler-with-puppeteer-d02a7919bdbe
}

startBot();
