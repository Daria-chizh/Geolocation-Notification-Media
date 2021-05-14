const processLocationInput = (input) => {
  const match = input.match(/\[?(-?\d+\.\d+),\s?(-?\d+\.\d+)]?/);
  if (!match) {
    throw Error('Неправильный формат геопозиции!');
  }

  return `[${match[1]}, ${match[2]}]`;
};

export default processLocationInput;
