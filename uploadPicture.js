const { getRandomIntBetween, delay } = require('./utils/funcs');

async function uploadPicture(page, images) {
  await page.waitForSelector('input[type=file]');

  const inputUploadHandle = await page.$('input[type=file]');

  if (images && images.length > 0) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < images.length; i++) {
      const fileToUploadPrincipal = images[i];
      // Sets the value of the file input to fileToUpload
      inputUploadHandle.uploadFile(fileToUploadPrincipal);
      // eslint-disable-next-line no-await-in-loop
      await delay(getRandomIntBetween(450, 1000));
    }
  }

  // END FILE UPLOAD
}
module.exports = { uploadPicture };
