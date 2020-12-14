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

  const urlUpload = 'https://web.wallapop.com/catalog/upload';
  if (adInformation && adInformation.length > 0) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < adInformation.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await page.goto(urlUpload);
      // eslint-disable-next-line no-await-in-loop
      await createAd(page, adInformation[i]);
      // eslint-disable-next-line no-await-in-loop
      await delay(getRandomIntBetween(1000, 1500));
    }
  }

  // TODO JALVAREZ SCHEDULING CRON JOB
  // https://levelup.gitconnected.com/building-a-scheduled-news-crawler-with-puppeteer-d02a7919bdbe

  // TODO IMPLEMENTAR FOREACH ASYNC
  // https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404

  // TODO READ THIS : https://advancedweb.hu/how-to-use-async-functions-with-array-foreach-in-javascript/

  // TODO MAÑANA EDITAR ANUNCIOS O EDITAR UBICACION
}

startBot();
