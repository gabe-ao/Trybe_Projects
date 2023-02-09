const productDetails = require('../src/productDetails');

/*
  Dadas duas strings que representam nomes de produtos, retorne um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara') // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Verifica se a função `productDetails` tem o comportamento esperado', () => {
    // ESCREVA SEUS TESTES ABAIXO:
    /* Criando uma variável para os testes */
    const testProduct = productDetails('Cougar', 'Asus');

    // Teste se productDetails é uma função.
    expect(typeof productDetails).toBe('function');
    
    // Teste se o retorno da função é um array.
    /* Como o comando typeof retorna 'object' para arrays, se torna necessário utilizar outro metodo para checar se o retorno é uma array.
    O metodo Array.isArray() existe especificamente para esse proposito, ele retorna true somente se a entrada for um array.
    Dessa forma, para implementa-lo devo avaliar se seu retorno com productDetails() sera true ou não.
    Ref.: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray */
    expect(Array.isArray(productDetails())).toBe(true);

    // Teste se o array retornado pela função contém dois itens dentro.
    expect(productDetails('Patriot', 'Intel').length).toBe(2);
    
    // Teste se os dois itens dentro do array retornado pela função são objetos.
    expect(typeof testProduct[0]).toBe('object');
    expect(typeof testProduct[1]).toBe('object');

    // Teste se quando passado parâmetros diferentes entre si, os dois objetos também são diferentes entre si.
    expect(testProduct[0]).not.toEqual(testProduct[1]);
    
    // Teste se os dois productIds terminam com 123.
    expect(testProduct[0].details.productId).toMatch('123');
    expect(testProduct[1].details.productId).toMatch('123');
  });
});
