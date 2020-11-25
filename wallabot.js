const {
  getRandomIntBetween,
  shuffleArray,
  executeWriteInputs,
} = require("./utils/funcs");

async function createAd(page) {
  await page.evaluate(() => {
    document.querySelector('.types').firstElementChild.click();
  });

  const writeInputs = async (id, text) => {
    await page.waitForSelector(id);
    await page.click(id);
    await page.type(id, text, { delay: getRandomIntBetween(100, 200) });
  };

  const priceId = '#price';
  const priceText = '0';

  const titleAdsId = '#headline';
  const titleText = 'Edicion ALADINO - PULSERA Y CHARMS en PLATA DE LEY';

  const descriptionId = '#tellUs';
  const hashtags =
    '#CharmDisney #MickeyMouse #MinnieMouse #Charm #IPHONE #IPHONE6 #REGALODEREYES #NAVIDAD #OUTLET #LIQUIDACION #OFERTAS #ALADINO #FROZEN #MULAN';
  const descriptionText = `${
    `${titleText} Nuevo a Estrenar Envios A toda España . \n` +
    "100% Plata de ley\n" +
    "\n" +
    "Acepto Bizum, transferencia o ingreso.\n" +
    "\n" +
    "Precios desde 10 euros. \n" +
    "\n"
  }${hashtags}`;

  /*  const descriptionText = `${
    `${titleText}\n` +
    'TODAS LAS TALLA ADULTO Y NIÑO -Mirar imagen para más informacion. \n' +
    "\n"
  }${hashtags}`; */

  const writeTitle = async () => writeInputs(titleAdsId, titleText);
  const writePrice = async () => writeInputs(priceId, priceText);
  const writeDescription = async () =>
    writeInputs(descriptionId, descriptionText);

  // FUNCIONALIDAD DE ALETORIEDAD

  const functionsWriteInputs = [writeTitle, writePrice, writeDescription];
  const disorderFunctionsWriteInputs = shuffleArray(functionsWriteInputs);

  await executeWriteInputs(disorderFunctionsWriteInputs);

  //  END FUNCIONALIDAD DE ALETORIEDAD

  // FILE UPLOAD
  await page.waitForSelector('input[type=file]');

  const inputUploadHandle = await page.$('input[type=file]');

  const fileToUploadPrincipal = 'edicion_aladino.jpg';
  const fileToUpload1 = 'image_1.jpg';
  const fileToUpload2 = 'image_2.jpg';
  const fileToUploadGeneral1 = 'image_general_1.jpg';

  // Sets the value of the file input to fileToUpload
  inputUploadHandle.uploadFile(fileToUploadPrincipal);
  /* inputUploadHandle.uploadFile(fileToUpload1);
  inputUploadHandle.uploadFile(fileToUpload2);
  inputUploadHandle.uploadFile(fileToUploadGeneral1); */

  // END FILE UPLOAD

  // SELECT BOXES

  // FIRST STEP
  const categoryId = '#category';
  const categoryText = 'Moda y accesorios';

  await writeInputs(categoryId, categoryText);
  await page.keyboard.press('Enter');

  const writeSelectBox = async (id, inputSelector, text) => {
    await page.click(id);
    await writeInputs(inputSelector, text);
    await page.keyboard.press('Enter');
  };

  const objectTypeId = '#objectType';
  const objectTypeText = 'Pulseras';
  // const objectTypeText = 'Camiseta Deporte';
  const objectTypeInputSelector =
    '#objectType > div > tsl-dropdown-list > div > div.filter > input';

  await writeSelectBox(objectTypeId, objectTypeInputSelector, objectTypeText);

  const genderId = '#gender';
  const genderText = 'Mujer';
  const genderInputSelector =
    '#gender > div > tsl-dropdown-list > div > div.filter > input';

  await writeSelectBox(genderId, genderInputSelector, genderText);

  const conditionId = '#conditions';
  const conditionsText = 'Sin estrenar';
  const conditionInputSelector =
    '#conditions > div > tsl-dropdown-list > div > div.filter > input';

  await writeSelectBox(conditionId, conditionInputSelector, conditionsText);

  // END SELECT BOXES

  const brandClass = '.keyword-suggester';
  const brandText = 'charm';
  await writeInputs(brandClass, brandText);

  await page.evaluate(() => {
    document.querySelector('.selector-container').firstElementChild.click();
  });
  await page.keyboard.press('Enter');
}
module.exports = { createAd };
