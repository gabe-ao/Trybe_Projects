const fetchProducts = async (query) => {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`; // Endpoint e o nome dado as urls que acessam as informacoes de interesse em uma API. Nesse caso, o endpoint e o endereco com a palavra chave da pesquisa.

  const products = await fetch(endpoint)
    .then((response) => response.json()); // Transformando a resposta em um objeto json valido para o JS.
  
  return products;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
