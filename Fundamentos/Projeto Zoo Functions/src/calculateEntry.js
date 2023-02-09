const data = require('../data/zoo_data');

function countEntrants(entrants) {
  const entrantsByAge = {
    child: 0,
    adult: 0,
    senior: 0,
  };

  /* Um loop para contabilizar os visitantes por idade */
  entrants.forEach((entrant) => {
    if (entrant.age >= 50) {
      entrantsByAge.senior += 1;
    } else if (entrant.age >= 18) {
      entrantsByAge.adult += 1;
    } else {
      entrantsByAge.child += 1;
    }
  });
  return entrantsByAge;
}

function calculateEntry(entrants) {
  /* Para testar se um objeto esta vazio, pode-se obter um array com suas chaves usando Object.keys() e dai testar se o comprimento deste array é 0. Afinal, se o objeto estiver vazio, ele nao possuira chaves. */
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }

  const { prices } = data; // Os precos da entrada estao na chave 'prices' de data.
  const { child, adult, senior } = countEntrants(entrants); // Para simplificar o codigo sera melhor receber cada propriedade separada em uma variavel propria
  return child * prices.child + adult * prices.adult + senior * prices.senior;
}

module.exports = { calculateEntry, countEntrants };
