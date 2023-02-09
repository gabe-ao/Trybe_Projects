const cartList = document.querySelector('.cart__items'); // Capturando a lista de itens do carrinho de compras. Ela e usada em cartItemClickListener(), getItemToCart() e clearCart(). Ela esta sendo declarada aqui porque o lint exigiu.

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function loadingScreen() {
  /* Funcao para ativar e desativar uma a mensagem de carregamento */
  const loadingIs = document.querySelector('.loading'); // Primeiro, buscando a mensagem de carregamento para testar se ela ja esta presente. Caso esteja, sera deletada, visto que essa funcao tanto ativa a mensagem quanto a desativa apos o carregamento acabar.
  if (loadingIs !== null) {
    loadingIs.remove();
    return;
  }
  const itemsSection = document.querySelector('.items');
  const loadingMsg = createCustomElement('p', 'loading', 'Carregando...'); // Criando o elemento com a mensagem de carregamento, configurando seu CSS e adicionando na seccao de items.
  loadingMsg.style.color = 'red';
  loadingMsg.style.fontSize = '42px';
  loadingMsg.style.height = '100%';
  loadingMsg.style.width = '100%';
  itemsSection.insertBefore(loadingMsg, document.querySelector('.item'));
}

async function getProductsList() {
  /* Funcao para requisitar a lista de produtos da API e adiciona-la a pagina */
  loadingScreen();
  const { results: productsList } = await fetchProducts('computador'); // A lista de produtos esta armazenada na chave 'results' do JSON retornado pela API.
  loadingScreen();
  const itemsSection = document.querySelector('.items'); // Capturando a seccao onde os itens serao colocados.

  productsList.forEach((product) => { // Para cada produto listado serao extraidas as informacoes necessarias, seus paineis serao construidos e adicionados a pagina.
    const productData = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };
    itemsSection.appendChild(createProductItemElement(productData));
  });
}

function createTotalPrice() {
  /* Funcao para criar o elemento Preco total que exibe o valor total dos itens no carrinho */
  const cart = document.querySelector('.cart');
  const totalPrice = document.createElement('p');
  totalPrice.innerHTML = 'Preço total: <b>R$ <data class="total-price">0.00</data></b>'; // O elemento <data> e usado porque o teste do requisito 5 exige que o preco total seja o unico valor contido no elemento com a classe 'total-price'.
  cart.insertBefore(totalPrice, document.querySelector('.empty-cart'));
}

function getPriceFromCartItem(item) {
  /* Funcao para ler o conteudo (innerText) de um item e retornar o preco registrado nele */
  const indexToCut = item.innerText.indexOf(' PRICE: $') + 9; // A funcao indexOf() retorna a posicao inicial de ' PRICE: $ ', logo, para obter a posicao inicial do valor do preco e necessario adicinar o comprimento de ' PRICE: $ ' que e 9! Ref.: https://www.w3schools.com/jsref/jsref_indexof.asp
  const price = parseFloat(item.innerText.substr(indexToCut)); // A funcao substr() recorta o restante do texto a partir do index do preco, como o preco e o final do texto, somente seu valor sera retornado. Ref.: https://www.w3schools.com/jsref/jsref_substr.asp
  return price;
}

function sumCartPrices() {
  /* Funcao para somar os precos de todos os itens no carrinho de compras */
  const totalPrice = document.querySelector('.total-price');
  const cartItems = document.querySelectorAll('.cart__item');
  let sumPrice = 0; 

  cartItems.forEach((item) => { // Como o retorno do querySelectorAll e um NodeList, a unica HOF de Array compativel e forEach. Uma pena porque nesse caso o ideal seria usar um reduce.
    sumPrice += getPriceFromCartItem(item);
  });
  totalPrice.innerHTML = `${sumPrice}`;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  if (event.target.className !== 'cart__item') { // Como esta sendo utilizado um EventListener global, torna-se necessario testar se o alvo do evento e valido. Caso nao seja, a funcao encerra sem retorno.
    return;
  }
  event.target.remove(); // Para deletar um elemnto HTML do DOM basta utilizar o metodo .remove() padrão do JS.
  saveCartItems(cartList.innerHTML); // Atualizando a lista no localStorage apos sua modificacao.
  sumCartPrices();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function getItemToCart(event) {
  /* Funcao para reconhecer o produto selecionado, requisitar seus dados a API e adiciona-lo ao carrinho */
  if (event.target.className !== 'item__add') { // Como esta sendo utilizado um EventListener global, torna-se necessario testar se o alvo do evento e um dos botoes validos. Caso nao seja, a funcao encerra sem retorno.
    return;
  }
  loadingScreen();
  const item = await fetchItem(getSkuFromProductItem(event.target.parentElement)); // Para capturar a ID do item correspondente ao botao clicado, deve-se acessar o elemento pai do botao, pois ele e o painel do item e contem suas informacoes basicas (ID, Nome e Miniatura).
  loadingScreen();
  const itemData = {
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  };
  cartList.appendChild(createCartItemElement(itemData)); // Criando o elemento com a descricao do item selecionado e o adicionando a seccao do carrinho.
  saveCartItems(cartList.innerHTML); // Para salvar a lista apos sua modificacao, e necessario utilizar a propriedade .innerHTML para passar o conteudo da lista como string, o qual e o formato adequado para armazenar no storage.
  sumCartPrices();
}

function clearCart(event) {
  /* Funcao para esvaziar o carrinho de compras, apaganado todos os itens registrados */
  if (event.target.className !== 'empty-cart') { // Como esta sendo utilizado um EventListener global, torna-se necessario testar se o alvo do evento e valido. Caso nao seja, a funcao encerra sem retorno.
    return;
  }
  while (cartList.hasChildNodes()) {
    cartList.firstChild.remove();
  }
  saveCartItems(cartList.innerHTML); // Atualizando a lista no localStorage apos sua modificacao.
  sumCartPrices();
}

window.onload = () => { 
  createTotalPrice();
  getProductsList();
  cartList.innerHTML = getSavedCartItems(); // Recuperando a lista de compras armazenada no localStorage e adicionando direto para o carrinho de compras.
  sumCartPrices();

  /* Considerando o numero variavel de elementos na pagina, e interessante usar um click listener global */
  document.addEventListener('click', (event) => {
    getItemToCart(event);
    cartItemClickListener(event);
    clearCart(event);
  });
};
