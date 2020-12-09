const getRandomIntBetween = (min, max) => {
  const minAux = Math.ceil(min);
  const maxAux = Math.floor(max);
  return Math.floor(Math.random() * (maxAux - minAux + 1)) + minAux;
};

const shuffleArray = (array) => {
  // eslint-disable-next-line no-plusplus
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    // eslint-disable-next-line no-param-reassign
    array[i] = array[j];
    // eslint-disable-next-line no-param-reassign
    array[j] = temp;
  }
  return array;
};

async function executeWriteInputs(disorderFunctionsWriteInputs) {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < disorderFunctionsWriteInputs.length; i++) {
    const func = disorderFunctionsWriteInputs[i];
    // eslint-disable-next-line no-await-in-loop
    await func();
  }
}
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
module.exports = {
  getRandomIntBetween,
  shuffleArray,
  executeWriteInputs,
  delay,
};
