const fetchItem = async (itemId) => {
  const endpoint = `https://api.mercadolibre.com/items/${itemId}`; // Endpoint e o nome dado as urls que acessam as informacoes de interesse em uma API. Nesse caso, o endpoint e o endereco com a ID do item selecionado.

  const itemData = await fetch(endpoint)
    .then((response) => response.json()); // Transformando a resposta em um objeto json valido para o JS.
  
  return itemData;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
