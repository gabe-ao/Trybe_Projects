const saveCartItems = (cartList) => {
  /* Adiciona a lista de compras do carrinho no localStorage, a lista e transformada em string com template literals para que possa ser armazenada */
  localStorage.setItem('cartItems', `${cartList}`);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
