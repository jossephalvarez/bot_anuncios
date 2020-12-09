async function uploadPicture(page, images) {
  await page.waitForSelector('input[type=file]');

  const inputUploadHandle = await page.$('input[type=file]');

  // TODO foreach depending adInformation.images
  const fileToUploadPrincipal = images[0];
  // Sets the value of the file input to fileToUpload
  inputUploadHandle.uploadFile(fileToUploadPrincipal);

  // END FILE UPLOAD
}
module.exports = { uploadPicture };
