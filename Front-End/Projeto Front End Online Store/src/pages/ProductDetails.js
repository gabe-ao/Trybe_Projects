import PropTypes from 'prop-types';
import React from 'react';
import GoBackButton from '../components/GoBackButton';
import AvaliationForm from '../components/AvaliationForm';
import ShoppingCartButton from '../components/ShoppingCartButton';
import { getProductFromId } from '../services/api';

class ProductDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      productchart: '',
    };
  }

  async componentDidMount() {
    const { query } = this.props;
    const productchart = await getProductFromId(query);

    this.setState({
      productchart,
    });
  }

  render() {
    const { productchart } = this.state;
    const { addItem } = this.props;

    return (
      <section className="products-details">
        <h1 data-testid="product-detail-name">
          {`${productchart.title} - R$ ${productchart.price}`}
        </h1>
        <img src={ productchart.thumbnail } alt={ productchart.title } />
        <div>
          <p>Especificações Técnicas</p>
          <ul>
            <li>{ productchart.condition }</li>
            <li>{ productchart.soldQuantity }</li>
            <li>{ productchart.domainId }</li>
          </ul>
        </div>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => addItem(productchart) }
        >
          Adicionar ao carrinho
        </button>
        <div>
          <ShoppingCartButton />
          <GoBackButton />
        </div>
        <div>
          <AvaliationForm />
        </div>
      </section>
    );
  }
}

ProductDetails.propTypes = {
  query: PropTypes.string.isRequired,
  addItem: PropTypes.func.isRequired,
};

export default ProductDetails;
