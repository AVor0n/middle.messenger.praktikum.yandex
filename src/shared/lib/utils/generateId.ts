let counter = 0;

const renderCounter = (base = 10) => {
  counter += 1;
  const value = counter;
  return value.toString(base);
};

const renderTime = (base = 10) => {
  const value = Date.now();
  return value.toString(base);
};

const renderRandom = (base = 10) => {
  const value = Math.floor(1e16 + 9e16 * Math.random());
  return value.toString(base);
};

export const generateId = (base = 10, separator = '-') =>
  renderCounter(base) + separator + renderTime(base) + separator + renderRandom(base);
