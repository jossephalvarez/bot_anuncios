const puppeteer = require("puppeteer");
const { schedule } = require("node-schedule");
const { CronJob } = require("cron");
const { createAd } = require('./wallabot');
const { changeLocation } = require('./changeLocation');
const { getRandomIntBetween, delay } = require("./utils/funcs");
const adInformation = require("./adInformation/wallapop/information.json");

const startBot = async () => {
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

  const profileURL = 'https://web.wallapop.com/profile/info';
  await page.goto(profileURL);

  await changeLocation(page);
  await delay(getRandomIntBetween(20000, 50000));
  await page.browser().close();

  /*  await delay(getRandomIntBetween(5000, 12000));
  const urlUpload = 'https://web.wallapop.com/catalog/upload';
  if (adInformation && adInformation.length > 0) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < adInformation.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      await page.goto(urlUpload);
      // eslint-disable-next-line no-await-in-loop
      await createAd(page, adInformation[i]);
      // eslint-disable-next-line no-await-in-loop
      await delay(getRandomIntBetween(20000, 50000));
    }
  } */

  // MODULE REPLY CHAT
  // Ver si esta presente #inbox-data
  // comprobar que hay un primer hijo

  // comprobar que es nuevo :( LOS NUEVOS TIENEN ESTAS 2 ELEMENTOS
  // #inbox-data > tsl-inbox-conversation:nth-child(1) > div > div > div.item-message-row > div.item-title-message-column
  // #inbox-data > tsl-inbox-conversation:nth-child(1) > div > div > div.item-message-row > div.unread-counter-column

  // Respuesta personalizada tomando el nombre : #inbox-data > tsl-inbox-conversation:nth-child(1) > div > div > div.user-name-row

  // si es nuevo entra y contesta
  // CLICK EN :
  // #inbox-data > tsl-inbox-conversation:nth-child(1)

  // / MODULE CHAT

  // TODO JALVAREZ SCHEDULING CRON JOB
  // https://levelup.gitconnected.com/building-a-scheduled-news-crawler-with-puppeteer-d02a7919bdbe

  // TODO IMPLEMENTAR FOREACH ASYNC
  // https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404

  // TODO READ THIS : https://advancedweb.hu/how-to-use-async-functions-with-array-foreach-in-javascript/

  // TODO MAÑANA EDITAR ANUNCIOS O EDITAR UBICACION
};
const job = new CronJob('*/6 * * * *', async () => {
  console.log('...Probemos el schedule', new Date());
  await startBot();
});
console.log('...Starting bot', new Date());
job.start();

// startBot();
