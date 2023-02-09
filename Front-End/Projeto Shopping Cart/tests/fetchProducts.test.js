require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  test('Teste se fetchProducts e uma funcao.', () => {
    expect(typeof(fetchProducts)).toBe('function'); // Obtendo o tipo de fetchProducts e avaliando seu valor.
  });

  test('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamado.', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  test('Teste se ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint de interesse.', async () => {
    await fetchProducts('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  test('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch.', async () => {
    /* Uma forma de condensar mais o codigo: inserir a chamada do 'fetchProducts' em expect() e testar tanto o sucesso da requisacao com '.resolves' quanto o conteudo retornado com o 'toEqual'. 
    Alem disso, utiliza-se 'toEqual' porque e a assercao que faz comparacao completa entre objetos. */
    await expect(fetchProducts('computador'))
      .resolves
      .toEqual(computadorSearch); 
  });

  test('Teste se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    /* Analogamente ao teste anterior: inserindo a chamada do 'fetchProducts' em expect() e testando tanto a falha da requisacao com '.rejects' quanto o erro lancado com 'toThrow'. 
    Para se avaliar erros, utiliza-se o 'toThrow' ou 'toThrowError'. */
    await expect(fetchProducts())
      .rejects
      .toThrow(new Error('You must provide an url'));
  });
});
