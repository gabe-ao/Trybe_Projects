require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  const argumentoTeste = 'MLB1615760527';
  
  test('Teste se fetchItem é uma função.', () => {
    expect(typeof(fetchItem)).toBe('function');
  });

  test('Execute a função fetchItem com o argumento "MLB1615760527" e teste se fetch foi chamada.', async () => {
    await fetchItem(argumentoTeste);
    expect(fetch).toHaveBeenCalled();
  });

  test('Teste se ao chamar a função fetchItem com o argumento "MLB1615760527", a função fetch utiliza o endpoint', async () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem(argumentoTeste);
    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  test('Teste se o retorno da função fetchItem com o argumento "MLB1615760527" é uma estrutura de dados igual ao objeto "item"', async () => {
    /* Uma forma de condensar mais o codigo: inserir a chamada do 'fetchItem' em expect() e testar tanto o sucesso da requisacao com '.resolves' quanto o conteudo retornado com o 'toEqual'.
    Alem disso, utiliza-se 'toEqual' porque e a assercao que faz comparacao completa entre objetos. */
    await expect(fetchItem(argumentoTeste)).resolves.toEqual(item);
  });

  test('Teste se ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    /* Analogamente ao teste anterior: inserindo a chamada do 'fetchItem' em expect() e testando tanto a falha da requisacao com '.rejects' quanto o erro lancado com 'toThrow'. 
    Para se avaliar erros, utiliza-se o 'toThrow' ou 'toThrowError'. */
    await expect(fetchItem())
      .rejects
      .toThrow(new Error('You must provide an url'));
  });
});
