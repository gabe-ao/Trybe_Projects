/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
// Desafio 1
function compareTrue(val1, val2) {
  /* Parâmetros: val1, val2. Representam os booleanos recebidos para comparação */
  /* Como foi pedido para utilizar somente o &&, pensei em resumir ao máximo possível a função. Logo, posso por a comparação das variáveis direto no return */
  return (val1 && val2);
}

// Desafio 2
function calcArea(base, altura) {
  /* Parâmetros: base, altura. Representam as medidas homônimas de um triângulo, a fim de calcular sua base */
  /* Por se tratar de um cálculo direto e simples, pode-se colocar sua formula direto no return */
  return ((base * altura) / 2);
}

// Desafio 3
function splitSentence(texto) {
  /* Parâmetros: texto. Representa uma string recebida como entrada */
  /* Para dividir uma string qualquer, pode-se usar a função própria do JS: .split(). Nessa questão, como a divisão será feita pelos espaços da frase, faz-se .split(" "). */
  return (texto.split(' '));
}

// Desafio 4
function concatName(listaPalavras) {
  /* Parâmetros: listaPalavras. Respresenta um array de strings recebido como entrada */
  /* Variáveis: texto_saida - String formada pelos primeiro e último itens da array de entrada, no padrão 'ÚLTIMO ITEM, PRIMEIRO ITEM' */
  /* Para criar a string com os último e primeiro itens, pode-se criar uma nova string com esses itens ajustados no padrão requerido */
  let textoSaida = '';
  textoSaida = listaPalavras[listaPalavras.length - 1] + ', ' + listaPalavras[0];
  return textoSaida;
}

// Desafio 5
function footballPoints(wins, ties) {
  /* Parâmetros: wins, ties. Representam respectivamente as vitórias e empatedes recebidos para calcular a pontuação final de um time de futebol */
  /* Por se tratar de um cálculo muito simples e direto, é melhor executa-lo direto no return */
  return (wins * 3 + ties);
}

// Desafio 6
function highestCount(numeros) {
  /* Parâmetros: numeros. Representa um array de números que será avaliado */
  /* Variáveis: maior - Armazena o maior número encontrado no array; contador - Contabiliza quantas vezes o maior número achado se repete no array; */
  /* Nessa função é necessário avaliar duas caracteristicas: maior valor e frequência dele. Uma forma é usar um For para percorrer o array, e um If-Else que cuida de contabilizar cada característica. O contador de frequência precisa começar como 1 porque sempre que um valor maior é achado, essa já é sua primeira aparição */

  let maior = numeros[0];
  let contador = 1;
  for (let indice = 1; indice < numeros.length; indice += 1) {
    if (numeros[indice] > maior) {
      maior = numeros[indice];
      contador = 1;
    } else if (numeros[indice] === maior) {
      contador += 1;
    }
  }
  return contador;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  /* Parâmetros: mouse, cat1, cat2. Representam respectivamente as posições do rato, gato 1 e gato 2 em uma reta */
  /* Variáveis: distancia1, distancia2. São respectivamente as distâncias entre o gato 1 e o rato, e o gato 2 e o rato */
  /* Para obter a distância entre os gatos e o rato, basta fazer o módulo da diferença entre suas posições. Daí se comparam as distâncias entre si. A função Math.abs() retorna o módulo de um número. */

  let distancia1 = Math.abs(mouse - cat1);
  let distancia2 = Math.abs(mouse - cat2);

  if (distancia1 === distancia2) {
    return 'os gatos trombam e o rato foge';
  } if (distancia1 > distancia2) {
    return 'cat2';
  }
  return 'cat1';
}

// Desafio 8
function fizzBuzz(numeros) {
  /* Parâmetros: numeros. Representa uma array de números a serme avaliados */
  /* Variáveis: restoPor3 e restoPor5 - Armazenam respectivamente os restos das divisões de um número por 3 e 5; resultado - Armazena o array com as respostas para cada número. */
  /* Para classificar a divisibilidade de cada número individualmente, é necessário fazer um For para percorrer os numeros recebidos e um conjunto de If-Else para avalia-los */

  let restoPor3;
  let restoPor5;
  let resultado = [];

  for (let indice = 0; indice < numeros.length; indice += 1) {
    restoPor3 = numeros[indice] % 3;
    restoPor5 = numeros[indice] % 5;

    if (restoPor3 !== 0 && restoPor5 !== 0) {
      resultado.push('bug!');
    } else if (restoPor3 === 0 && restoPor5 === 0) {
      resultado.push('fizzBuzz');
    } else if (restoPor3 === 0) {
      resultado.push('fizz');
    } else {
      resultado.push('buzz');
    }
  }

  return resultado;
}

// Desafio 9
function encode(texto) {
  /* Parâmetros: texto. Um texto qualquer que será codificado */
  /* Variáveis: textoCodificado - String para o texto final codificado; vogais e codigo - Arrays de strings usados para identificar as vogais para substiuir e o código que será colocado no lugar; */
  /* Esta função tem como seu maior desafio o fato de strings serem "imutáveis" em JS, assim, é necessário criar uma nova string adicionando cada caracter nela um por um para chegar ao resultado requerido. Utilizei o fato de que posições ainda não preenchidas da string nova seriam undefined, para poder identifica-las e preenche-las com as consoantes. */
  /* Outra solução seria utilizar string.replace(), mas ainda não entendi bem como controlar seus parâmtros para fazer trocas completas de caracteres. */

  let textoCodificado = '';
  let vogais = ['a', 'e', 'i', 'o', 'u'];
  let codigo = ['1', '2', '3', '4', '5'];

  for (let indice = 0; indice < texto.length; indice += 1) {
    for (let indice2 = 0; indice2 < vogais.length; indice2 += 1) {
      if (texto[indice] === vogais[indice2]) {
        textoCodificado += codigo[indice2];
      }
    }

    if (textoCodificado[indice] === undefined) {
      textoCodificado += texto[indice];
    }
  }

  return textoCodificado;
}
function decode(texto) {
  /* Parâmetros: texto. Um texto qualquer que será codificado */
  /* Variáveis: textoDecodificado - String para o texto final decodificado; vogais e codigo - Arrays de strings usados para identificar o código para substiuir e as vogais que serão colocadas no lugar; */
  /* Esta função tem como seu maior desafio o fato de strings serem "imutáveis" em JS, assim, é necessário criar uma nova string adicionando cada caracter nela um por um para chegar ao resultado requerido. Utilizei o fato de que posições ainda não preenchidas da string nova seriam undefined, para poder identifica-las e preenche-las com as consoantes. */
  /* Outra solução seria utilizar string.replace(), mas ainda não entendi bem como controlar seus parâmtros para fazer trocas completas de caracteres. */
  
  let textoDecodificado = '';
  let vogais = ['a', 'e', 'i', 'o', 'u'];
  let codigo = ['1', '2', '3', '4', '5'];

  for (let indice = 0; indice < texto.length; indice += 1) {
    for (let indice2 = 0; indice2 < codigo.length; indice2 += 1) {
      if (texto[indice] === codigo[indice2]) {
        textoDecodificado += vogais[indice2];
      }
    }

    if (textoDecodificado[indice] === undefined) {
      textoDecodificado += texto[indice];
    }
  }

  return textoDecodificado;
}

// Desafio 10
function techList(tecnologias, name) {
  /* Parâmetros: tecnologias, name. Respectivamente, um array de tecnologias em strings e o nome do usuário */
  /* Variáveis: tecnologiasOrdenadas - O array de tecnologias ordenado alfabeticamente; listaTecnologias - Array para entregar a lista final de objetos/estruturas */
  /* Graças a função .sort() que ordena strings alfabeticamente, este desafio acaba sendo fácil de resolver. Com a lista de tecnologias ordenada, basta um for para criar as estruturas e adiciona-las a lista do resultado */

  if (tecnologias == false) {
    return 'Vazio!';
  }

  let tecnologiasOrdenadas = tecnologias.sort();
  let listaTecnologias = [];
  for (let indice = 0; indice < tecnologias.length; indice += 1) {
    listaTecnologias.push({tech: tecnologiasOrdenadas[indice], name: name});
  }

  return listaTecnologias;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
  techList,
};
