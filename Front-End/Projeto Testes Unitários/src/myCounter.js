/* eslint-disable no-var */
/* eslint-disable block-scoped-var */
/* eslint-disable no-redeclare */
/* eslint-disable vars-on-top */

/*
  A função myCounter possui dois loops aninhados que inserem valores dentro de um array.
  Como podemos perceber, eles vão adicionando valores ao array até sua condição de parada.
  Corrija o código abaixo para que a função retorne o array correto.
  Atenção: não remova os `for`s da função e sim corrija os erros presentes.

  Parâmetros:
  - Nenhum.

  Comportamento:
  myCounter() // Retorna: [0, 2, 3, 1, 2, 3, 2, 2, 3, 3, 2, 3];
*/

const myCounter = () => {
  /* A primeira mudanca a ser feite é substituir todos os var por let porque o var permite o vazamento de variavel, o que causa confusao nos counters de cada for.
  Pois, eles serao tratados como a mesma variavel e isso quebrara os fors.
  Em seguida, para dar mais clareza ao codigo e tambem garantir que cada for tem seu proprio contador, deve-se renomear o segundo counter. */
  let myArray = [];
  for (let counter = 0; counter <= 3; counter += 1) {
    myArray.push(counter);
    for (let counter2 = 2; counter2 <= 3; counter2 += 1) {
      myArray.push(counter2);
    }
  }
  return myArray;
};

module.exports = myCounter;
