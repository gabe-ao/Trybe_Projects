/* Para que os testes alcancacem 100% de cobertura, foi necessario deixar somente a recuperacao dos dados do localStorage nesta funcao, sem qualquer outro tratamento.  Os quais foram transferidos para script.js. */
const getSavedCartItems = () => localStorage.getItem('cartItems');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
