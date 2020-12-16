const { writeInputs } = require('./writter');
const { getRandomIntBetween, delay } = require("./utils/funcs");

async function changeLocation(page) {
  const locationId = '#location';
  const mapId = '#map';
  const inputLocationId = '#pac-input-header';

  await page.waitForSelector(locationId);
  await page.click(locationId);

  await page.waitForSelector(mapId, 1000);
  await page.waitForSelector(inputLocationId, 2000);

  const inputValue = await page.$eval(inputLocationId, (el) => el.value);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < inputValue.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await delay(getRandomIntBetween(200, 550));
    // eslint-disable-next-line no-await-in-loop
    await page.keyboard.press('Backspace');
  }
  const zipCodes = ['41840', '41006', '41007', '28002'];

  const randomZipCode = zipCodes[Math.floor(Math.random() * zipCodes.length)];

  await writeInputs(page, inputLocationId, randomZipCode);
  await delay(getRandomIntBetween(500, 1000));

  const buttonZipCodeId = '#ngb-typeahead-1-0';
  await page.waitForSelector(buttonZipCodeId);
  await page.click(buttonZipCodeId);
  await delay(getRandomIntBetween(1000, 1500));
  const applyButtonSelector =
    'body > ngb-modal-window > div > div > tsl-location-modal > div > button';
  await page.click(applyButtonSelector);
  await delay(getRandomIntBetween(500, 1200));
  const submitButtonSelector =
    'body > tsl-root > tsl-profile > div > div > tsl-profile-info > tsl-profile-form > form > div:nth-child(2) > div > div:nth-child(6) > div > tsl-button > button';
  await page.click(submitButtonSelector);
}
module.exports = { changeLocation };
