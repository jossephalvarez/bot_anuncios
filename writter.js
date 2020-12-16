const { getRandomIntBetween } = require('./utils/funcs');

const writeInputs = async (page, id, text) => {
  await page.waitForSelector(id);
  await page.click(id);
  await page.type(id, text, { delay: getRandomIntBetween(100, 200) });
};
const writeSelectBox = async (page, id, inputSelector, text) => {
  await page.click(id);
  await writeInputs(page, inputSelector, text);
  await page.keyboard.press('Enter');
};
module.exports = { writeInputs, writeSelectBox };
