const { getRandomIntBetween, delay } = require('./utils/funcs');

async function uploadPicture(page, images) {
  await page.waitForSelector('input[type=file]');

  if (images && images.length > 0) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < images.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const inputUploadHandle = await page.$('input[type=file]');
      const fileToUploadPrincipal = images[i];
      // Sets the value of the file input to fileToUpload
      // eslint-disable-next-line no-await-in-loop
      await inputUploadHandle.uploadFile(fileToUploadPrincipal);
      // eslint-disable-next-line no-await-in-loop
      await delay(getRandomIntBetween(450, 1500));
    }
  }

  // END FILE UPLOAD
}
module.exports = { uploadPicture };
