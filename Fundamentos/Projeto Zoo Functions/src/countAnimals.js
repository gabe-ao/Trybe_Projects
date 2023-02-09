const data = require('../data/zoo_data');

const { species } = data; // Os dados sobre cada especie estao na chave 'species' de data.

function allAnimals() {
  /* Funcao criada para contabilizar todos os animais! */
  const animals = {};
  species.forEach((group) => {
    animals[`${group.name}`] = group.residents.length;
  });
  return animals;
}

function countAnimals(animal) {
  /* Primeira condicao: Contar todos os animais sem restrincoes. */
  if (animal === undefined) {
    return allAnimals();
  }

  /* Segunda condicao: Contabilizar todos os individuos de uma especie fornecida. */
  const { residents } = species.find((group) => group.name === animal.specie); // Coletando com .find() somente a chave 'residents' da especie de animal fornecida.
  if (animal.sex === undefined) {
    return residents.length;
  }

  /* Terceira condicao: Contabilizar somente individuos com um dado sexo e de uma dada especie. */
  return residents.reduce((animalCounter, resident) => {
    if (resident.sex === animal.sex) {
      return animalCounter + 1;
    }
    return animalCounter;
  }, 0);
}

module.exports = countAnimals;
