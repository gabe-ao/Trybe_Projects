// import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import ProductDetails from './pages/ProductDetails';
import ShoppingCartPage from './pages/ShoppingCartPage';
import CheckoutPage from './pages/CheckoutPage';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [], // array do produto
    };
  }

  // quando o componente é montado, recupera os items do carrinho, se houver e se não houver, através da função abaixo.
  componentDidMount = () => {
    this.getCartFromStorage();
  }

  // recupera o que foi salvo no localStorage na chave cartProducts. O parse serve para transformar para objeto novamente, já que foi salvo como string.
  getCartFromStorage = () => {
    const items = JSON.parse(localStorage.getItem('cartProducts')) || []; // caso seja undefined, retorna array vazio.
    this.setState({
      items,
    });
  }

  // parametro passado pra função pelo ProductsCards
  addItem = async (productObj) => {
    const { items } = this.state;

    const indexItems = items.findIndex((item) => item.id === productObj.id); // função que quando não encontra um item.id em items com o mesmo indice de productObj.id, retorna -1
    const numberVerify = -1;

    // verifica se indexItems é igual a numberVerify, se for, cria a chave quantity no productObj recebido pela addItem e adc esse productObj ao array items.
    if (indexItems === numberVerify) {
      productObj.quantity = 1;
      items.push(productObj);
    } else { // se o productObj já existe, somente aumenta a quantidade dele. Acessa pelo index e incrementa quantity.
      items[indexItems].quantity += 1;
    }
    // atualiza o estado items com o array items e salva no localStorage. Converte pra string e salva na chave CartProducts.
    this.setState(() => ({
      items,
    }), () => {
      localStorage.setItem('cartProducts', JSON.stringify(items));
    });
  }

  plusItem = (quantity, id) => {
    const { items } = this.state;
    quantity += 1;

    const itemQt = items.find((item) => item.id === id);
    itemQt.quantity = quantity;

    this.setState(() => ({
      items,
    }), () => {
      localStorage.setItem('cartProducts', JSON.stringify(items));
    });
  }

  minusItem = (quantity, id) => {
    const { items } = this.state;
    quantity -= 1;

    const itemQt = items.find((item) => item.id === id);
    itemQt.quantity = quantity;

    if (itemQt.quantity === 0) {
      const index = items.findIndex((item) => item.id === id);
      this.deleteItem(index);
    }

    this.setState(() => ({
      items,
    }), () => {
      localStorage.setItem('cartProducts', JSON.stringify(items));
    });
  }

  deleteItem = (index) => {
    const { items } = this.state;

    items.splice(index, 1);
    this.setState(() => ({
      items,
    }), () => {
      localStorage.setItem('cartProducts', JSON.stringify(items));
    });
  }

  render() {
    const { items } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" render={ () => <Home addItem={ this.addItem } /> } />
          <Route
            exact
            path="/cart"
            render={ () => (
              <ShoppingCartPage
                items={ items }
                plusItem={ this.plusItem }
                minusItem={ this.minusItem }
                deleteItem={ this.deleteItem }
              />) }
          />
          <Route
            exact
            path="/product-details/:id"
            render={ (props) => (
              <ProductDetails
                query={ props.match.params.id }
                addItem={ this.addItem }
              />) }
          />
          <Route
            exact
            path="/checkout"
            render={ () => <CheckoutPage items={ items } /> }
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
