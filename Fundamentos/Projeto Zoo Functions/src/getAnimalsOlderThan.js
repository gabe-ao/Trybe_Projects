const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  const { species } = data; // Os dados sobre cada especie estao na chave 'species' de data.

  const targetSpecies = species.find((group) => group.name === animal);

  return targetSpecies.residents.every((resident) => resident.age >= age);
}

module.exports = getAnimalsOlderThan;
