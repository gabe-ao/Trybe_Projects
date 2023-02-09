import PropTypes from 'prop-types';
import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import CheckoutButton from './CheckoutButton';
import './Home.css';
import ProductsCards from './ProductsCards';
import ShoppingCartButton from './ShoppingCartButton';

class Home extends React.Component {
  constructor() {
    super();

    this.gettingCategories = this.gettingCategories.bind(this);
    this.getInput = this.getInput.bind(this);
    this.gettingProducts = this.gettingProducts.bind(this);
    this.selectCategory = this.selectCategory.bind(this);

    this.state = {
      categoriesList: [],
      inputValue: '',
      searchValue: '',
      productsList: [],
    };
  }

  componentDidMount() {
    this.gettingCategories();
  }

  async gettingCategories() {
    const lista = await getCategories();

    this.setState({
      categoriesList: lista,
    });
  }

  getInput(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  async gettingProducts() {
    const { inputValue } = this.state;
    const products = await getProductsFromCategoryAndQuery(inputValue)
      .then((response) => response.results);

    this.setState({
      productsList: products,
      searchValue: inputValue,
    });
  }

  async selectCategory(categoryId) {
    const { searchValue } = this.state;
    const filterProducts = await getProductsFromCategoryAndQuery(searchValue, categoryId)
      .then((response) => response.results);

    this.setState({
      productsList: filterProducts,
    });
  }

  render() {
    const { categoriesList, productsList } = this.state;
    const { addItem } = this.props;
    const msgInitial = (
      <p data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    );
    return (
      <section className="main-section-home">
        <nav className="categories">
          {
            categoriesList.map((category) => (
              <button
                data-testid="category"
                type="button"
                id={ category.id }
                key={ category.id }
                onClick={ (e) => this.selectCategory(e.target.id) }
              >
                { category.name }
              </button>
            ))
          }
        </nav>
        <div className="search-list">
          <form className="searchbar">
            <input
              type="text"
              onChange={ (e) => this.getInput(e) }
              data-testid="query-input"
            />
            <button
              type="button"
              onClick={ this.gettingProducts }
              data-testid="query-button"
            >
              Procurar
            </button>
            <div>
              <ShoppingCartButton />
            </div>
            <CheckoutButton />
          </form>
          <div>
            { productsList.length <= 0
              ? (msgInitial) : (
                <ProductsCards
                  productsList={ productsList }
                  addItem={ addItem }
                />
              )}
          </div>
        </div>
      </section>
    );
  }
}

Home.propTypes = {
  addItem: PropTypes.func.isRequired,
};

export default Home;
