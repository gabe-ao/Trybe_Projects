const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  const { species, employees } = data; // Os dados sobre os animais estao na chave 'species', enquanto os dados dos funcionarios estao na chave 'employees' de data.
  const { responsibleFor } = employees.find((employee) => employee.id === id); // Coletando a lista de animais gerenciados pelo funcionario fornecido.
  const { residents } = species.find((animal) => animal.id === responsibleFor[0]); // Coletando a lista de individuos da primeira especie gerenciada pelo funcionario fornecido.

  /* Reduce() para comparar as idades dos animais entre si e manter aquele que for mais velho. */
  const oldest = residents.reduce((previousResident, nextResident) => {
    if (nextResident.age > previousResident.age) {
      return nextResident;
    }
    return previousResident;
  });
  return [oldest.name, oldest.sex, oldest.age];
}

module.exports = getOldestFromFirstSpecies;
