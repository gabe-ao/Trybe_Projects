const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  const { employees } = data; // Os dados sobre os funcionarios estao na chave 'employees' de data.

  /* Utilizando um .find para buscar o funcionario pelo nome e sobrenome. */
  const found = employees.find(
    (employee) => employee.firstName === employeeName || employee.lastName === employeeName,
  );

  /* Se o .find não encontrar resultado, ele retornará 'undefined', o que implica que o retorno dever ser um objeto vazio. */
  if (found === undefined) {
    return {};
  }
  return found;
}

module.exports = getEmployeeByName;
