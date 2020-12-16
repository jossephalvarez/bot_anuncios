const { writeInputs, writeSelectBox } = require("./writter");
const { shuffleArray, executeWriteInputs } = require('./utils/funcs');
const { uploadPicture } = require('./uploadPicture');

async function createAd(page, adInformation) {
  await page.evaluate(() => {
    document.querySelector('.types').firstElementChild.click();
  });

  const priceId = '#price';

  const titleAdsId = '#headline';

  const descriptionId = '#tellUs';

  const descriptionText = `${adInformation.title} ${adInformation.description} ${adInformation.hashtags}`;

  const writeTitle = async () =>
    writeInputs(page, titleAdsId, adInformation.title);
  const writePrice = async () =>
    writeInputs(page, priceId, adInformation.price);
  const writeDescription = async () =>
    writeInputs(page, descriptionId, descriptionText);

  // FUNCIONALIDAD DE ALETORIEDAD

  const functionsWriteInputs = [writeTitle, writePrice, writeDescription];
  const disorderFunctionsWriteInputs = shuffleArray(functionsWriteInputs);

  await executeWriteInputs(disorderFunctionsWriteInputs);

  //  END FUNCIONALIDAD DE ALETORIEDAD

  // FILE UPLOAD
  await uploadPicture(page, adInformation.images);
  // END FILE UPLOAD

  // SELECT BOXES

  // FIRST STEP
  const categoryId = '#category';

  await writeInputs(page, categoryId, adInformation.category);
  await page.keyboard.press('Enter');
  // END FIRST STEP

  const objectTypeId = '#objectType';
  const objectTypeInputSelector =
    '#objectType > div > tsl-dropdown-list > div > div.filter > input';

  await writeSelectBox(
    page,
    objectTypeId,
    objectTypeInputSelector,
    adInformation.subCategory
  );

  const genderId = '#gender';
  const genderInputSelector =
    '#gender > div > tsl-dropdown-list > div > div.filter > input';

  await writeSelectBox(
    page,
    genderId,
    genderInputSelector,
    adInformation.gender
  );

  const conditionId = '#conditions';
  const conditionInputSelector =
    '#conditions > div > tsl-dropdown-list > div > div.filter > input';

  await writeSelectBox(
    page,
    conditionId,
    conditionInputSelector,
    adInformation.condition
  );

  // END SELECT BOXES

  const brandClass = '.keyword-suggester';
  const brandText = 'charm';
  await writeInputs(page, brandClass, brandText);

  await page.evaluate(() => {
    document.querySelector('.selector-container').firstElementChild.click();
  });
  await page.keyboard.press('Enter');
  console.log('page.url()', page.url());
}
module.exports = { createAd };
