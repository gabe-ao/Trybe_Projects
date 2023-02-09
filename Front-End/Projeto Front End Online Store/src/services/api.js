export async function getCategories() {
  const endpoint = 'https://api.mercadolibre.com/sites/MLB/categories'; // Endereco para requisicao de categoras da API

  const categories = await fetch(endpoint) // O fetch obtem a resposta do endpoint selecionado e depois essa reposta e convertida em um objeto json que pode ser trabalhado pela aplicacao
    .then((response) => response.json());

  return categories;
}

export async function getProductsFromCategoryAndQuery(query, categoryId) {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`; // Endereco de pesquisa por categoria e palavra-chave na API

  const products = await fetch(endpoint) // O fetch obtem a resposta do endpoint selecionado e depois essa reposta e convertida em um objeto json que pode ser trabalhado pela aplicacao
    .then((response) => response.json());

  return products;
}

export async function getProductFromId(productId) {
  const endpoint = `https://api.mercadolibre.com/items/${productId}`; // Endereco de pesquisa por produto específico

  const product = await fetch(endpoint)
    .then((response) => response.json());

  return product;
}
