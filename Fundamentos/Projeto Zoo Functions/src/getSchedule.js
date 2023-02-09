const data = require('../data/zoo_data');

const { species, hours } = data; // A disponibilidade dos animais esta na chave 'species', enquanto os horarios de funcionamente estao em 'hours' de data.

function getAvailableAnimals(day) {
  /* Funcao para retornar os animais disponiveis no dia escolhido. */
  /* Para construir o array com o resultado, pode-se utilizar a HOF .reduce() com o acumulador sendo um array vazio, []. Dessa forma, a cada iteracao da .reduce(), se adiciona um novo animal ao array caso ele va estar disponivel naquele dia. Ref.: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce */
  return species.reduce((availableAnimals, animal) => {
    if (animal.availability.includes(day)) {
      return [...availableAnimals, animal.name];
    }
    return availableAnimals;
  }, []);
}

function createSchedule(days) {
  /* Funcao para construir o objeto com a programacao do zoologico */
  const schedule = {};
  days.forEach((day) => {
    if (hours[`${day}`].open === 0) {
      schedule[`${day}`] = {
        officeHour: 'CLOSED',
        exhibition: 'The zoo will be closed!',
      };
    } else {
      schedule[`${day}`] = {
        officeHour: `Open from ${hours[`${day}`].open}am until ${hours[`${day}`].close}pm`,
        exhibition: getAvailableAnimals(day),
      };
    }
  });
  return schedule;
}

function getSchedule(scheduleTarget) {
  const days = Object.keys(hours); // Coletando os dias da semana de acordo com as chaves de 'hours'.
  const animals = species.map((animal) => animal.name); // Coletando os nomes de cada animal do zoologico.

  if (days.includes(scheduleTarget)) { // Se a entrada for um dia valido, retorna sua programacao.
    return createSchedule([scheduleTarget]);
  } if (animals.includes(scheduleTarget)) { // Se a entrada for um animal valido, retorna sua disponibilidade.
    const { availability } = species.find((animal) => animal.name === scheduleTarget);
    return availability;
  }
  return createSchedule(days); // Se o parametro passado nao for um dia ou um animal valido, a programacao completa sera retornada.
}

module.exports = getSchedule;
