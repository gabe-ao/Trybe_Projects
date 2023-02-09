const data = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  const found = [];
  const { species } = data; // Os dados sobre cada especie estao na chave 'species' de data.

  /* Loop para buscar animais por cada ID fornecida a funcao. */
  ids.forEach((id) => {
    found.push(species.find((animal) => animal.id === id));
  });
  return found;
}

module.exports = getSpeciesByIds;
