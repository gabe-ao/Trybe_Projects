/*
  A função average recebe um array (tamanho variável) e retorna a média dos valores recebidos.
  Caso a função receba algum valor não númerico ou um array vazio,
  o valor undefined deve ser retornado.
  Todos os resultados devem ser arredondados para valores inteiros. Ex: 4,6 vira 5; 1,3 vira 1.

  Parâmetros:
    - Um array. Exemplos: [1, 2]; [1, 2, 3, 4, 5]; [1, 2, '3']; [];
  Comportamento:
    - average([2, 2]) // Retorno: 2;
    - average([1, 1]) // Retorno: 1;
    - average([1, '2']) // Retorno: undefined;
*/

let average = (vetor) => {
  if (vetor.length === 0) {
    return undefined;
  }

  let soma = 0;
  for (let numero of vetor) {
    if (typeof (numero) !== 'number') {
      return undefined;
    }
    soma += numero;
  }

  /* 
    Para conseguir atender ao requisito de arredondamento da media, decidi recorrer ao metodo round() do Math que é um objeto nativo de JS.
    Essa função arredonda os números para o inteiro mais proximo.
    Quando a parte fracionaria for 0,5 ou maior, o valor sera arredondado para cima. Caso seja menor que 0,5, o valor sera arredondado para baixo. 
    Ref: https://pawelgrzybek.com/rounding-and-truncating-numbers-in-javascript/ 
  */
  const media = Math.round(soma / vetor.length);
  return media; 
};

module.exports = average;
