const puppeteer = require("puppeteer");

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
    ignoreHTTPSErrors: true,
    userDataDir: './tmp',
    dumpio: true,
    devtools: true,
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

  await page.goto("https://web.wallapop.com/catalog/upload");

  await page.evaluate(() => {
    document.querySelector('.types').firstElementChild.click();
  });

  const titleAdsId = '#headline';
  const titleText = 'Charm Colgante en plata de ley Pluto Navideño de Disney';

  const priceId = '#price';
  const priceText = '0';

  const descriptionId = '#tellUs';
  const descriptionText =
    `${titleText} Nuevo a Estrenar Envios A toda España . \n` +
    '100% Plata de ley\n' +
    '\n' +
    'Acepto Bizum, transferencia o ingreso.\n' +
    '\n' +
    'Precios desde 10 euros. \n' +
    '\n' +
    '#CharmDisney #MickeyMouse #MinnieMouse #Charm #IPHONE #IPHONE6 #REGALODEREYES #NAVIDAD';

  const getRandomIntBetween = (min, max) => {
    const minAux = Math.ceil(min);
    const maxAux = Math.floor(max);
    return Math.floor(Math.random() * (maxAux - minAux + 1)) + minAux;
  };

  const writeInputs = async (id, text) => {
    await page.waitForSelector(id);
    await page.click(id);
    await page.type(id, text, { delay: getRandomIntBetween(100, 200) });
  };

  await writeInputs(titleAdsId, titleText);
  await writeInputs(priceId, priceText);
  await writeInputs(descriptionId, descriptionText);
  // FILE UPLOAD
  await page.waitForSelector('input[type=file]');

  const inputUploadHandle = await page.$('input[type=file]');

  const fileToUploadPrincipal = 'image_principal.jpg';
  const fileToUpload1 = 'image_1.jpg';
  const fileToUpload2 = 'image_2.jpg';
  const fileToUploadGeneral1 = 'image_general_1.jpg';

  // Sets the value of the file input to fileToUpload
  inputUploadHandle.uploadFile(fileToUploadPrincipal);
  inputUploadHandle.uploadFile(fileToUpload1);
  inputUploadHandle.uploadFile(fileToUpload2);
  inputUploadHandle.uploadFile(fileToUploadGeneral1);
  // END FILE UPLOAD

  // SELECT BOXES
  const categoryId = '#category';
  const categoryText = 'Moda y accesorios';
  await writeInputs(categoryId, categoryText);
  await page.keyboard.press('Enter');

  const objectTypeId = '#objectType';
  const objectTypeText = 'Pulseras';
  const objectTypeInputSelector =
    '#objectType > div > tsl-dropdown-list > div > div.filter > input';
  await page.click(objectTypeId);
  await writeInputs(objectTypeInputSelector, objectTypeText);
  await page.keyboard.press('Enter');

  const genderId = '#gender';
  const genderText = 'Mujer';
  const genderInputSelector =
    '#gender > div > tsl-dropdown-list > div > div.filter > input';
  await page.click(genderId);
  await writeInputs(genderInputSelector, genderText);
  await page.keyboard.press('Enter');

  const conditionId = '#conditions';
  const conditionsText = 'Sin estrenar';
  const conditionInputSelector =
    '#conditions > div > tsl-dropdown-list > div > div.filter > input';
  await page.click(conditionId);
  await writeInputs(conditionInputSelector, conditionsText);
  await page.keyboard.press('Enter');
  // END SELECT BOXES

  const brandClass = '.keyword-suggester';
  const brandText = 'charm';
  await writeInputs(brandClass, brandText);

  await page.evaluate(() => {
    document.querySelector('.selector-container').firstElementChild.click();
  });
  await page.keyboard.press('Enter');
  await page.screenshot({ path: "product_done_before.jpg" });

  // SUBMIT PRODUCT
  /*  await page.waitForSelector('input[type=submit]');

  const submitButton = await page.$('input[type=submit]');
  if (submitButton) {
    await Promise.all([page.waitForNavigation(), submitButton.click()]);
  } */
  // END SUBMIT PRODUCT
}

getVinted();
