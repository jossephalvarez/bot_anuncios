const getRandomIntBetween = (min, max) => {
  const minAux = Math.ceil(min);
  const maxAux = Math.floor(max);
  return Math.floor(Math.random() * (maxAux - minAux + 1)) + minAux;
};
module.exports = { getRandomIntBetween };
