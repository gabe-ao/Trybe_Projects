/* eslint-disable prefer-template */
/* eslint-disable max-lines-per-function */
/* eslint-disable complexity */
// Desafio 11
function generatePhoneNumber(numeros) {
  /* Parâmetros: numeros. Um array com numeros para formar um telefone. */
  /* Variáveis: contador - Usado para contabilizar o número de aparições de cada valor presente na entrada; telefone - O número de telefone final gerado. */

  if (numeros.length !== 11) {
    return 'Array com tamanho incorreto.';
  }

  for (let indice = 0; indice < numeros.length; indice +=1) {
    if (numeros[indice] < 0 || numeros[indice] > 9) {
      return 'não é possível gerar um número de telefone com esses valores';
    }
  }

  let contador = 1;
  for (let indice = 0; indice < numeros.length; indice +=1) {
    for (let indice2 = indice + 1; indice2 < numeros.length; indice2 +=1) {
      if (numeros[indice] === numeros[indice2]) {
        contador += 1;
        if (contador >= 3) {
          return 'não é possível gerar um número de telefone com esses valores';
        }
      }
    }
    contador = 1; //  Resetar o contador de aparições para contabilizar o próximo número
  }

  let telefone;
  telefone = '(' + numeros[0] + numeros[1] + ')' + ' ' + numeros[2] + numeros[3] + numeros[4] + numeros[5] + numeros[6] + '-' + numeros[7] + numeros[8] + numeros[9] + numeros[10];

  return telefone;
}


// Desafio 12
function triangleCheck(lineA, lineB, lineC) {
  /* Parâmetros: lineA, lineB, lineC. Representam os três segmentos de reta para se testar se formam um triângulo */
  /* Uma forma simples e direta de lidar com esse desafio é criar ifs aninhados que checam se cada lado atende as condições necessárias. A função Math.abs() retorna o módulo de sua entrada. */

  if (lineA < (lineB + lineC) && lineA > Math.abs(lineB - lineC)) {
    if (lineB < (lineA + lineC) && lineB > Math.abs(lineA - lineC)) {
      if (lineC < (lineA + lineB) && lineC > Math.abs(lineA - lineB)) {
        return true;
      }
    }
  }
  return false;
}

// Desafio 13
function hydrate() {
  // seu código aqui
}

module.exports = {
  generatePhoneNumber,
  hydrate,
  triangleCheck,
};
