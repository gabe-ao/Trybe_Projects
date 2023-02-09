const data = require('../data/zoo_data');

const { employees } = data; // Os dados sobre os funcionarios estao na chave 'employees' de data.

function isManager(id) {
  /* O .some permite testar se a ID fornecida esta presente na lista de gerentes de cada usuario. */
  return employees.some((employee) =>
    employee.managers.includes(id));
}

function getRelatedEmployees(managerId) {
  /* Uma condicao para avaliar se a ID de entrada pertence a um gerente ou não. */
  if (!isManager(managerId)) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }

  /* Loop para buscar cada funcionario, checar se a ID corresponde ao gerente dele e, se positivo, salvar o nome dele. */
  const subordinates = [];
  employees.forEach((employee) => {
    const { managers } = employee;
    if (managers.some((element) => element === managerId)) {
      subordinates.push(`${employee.firstName} ${employee.lastName}`);
    }
  });
  return subordinates;
}

module.exports = { isManager, getRelatedEmployees };
