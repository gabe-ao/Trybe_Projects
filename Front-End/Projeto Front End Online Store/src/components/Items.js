import { PropTypes } from 'prop-types';
import React from 'react';

class Items extends React.Component {
  render() {
    const {
      productName,
      productImage,
      productPrice,
      quantity,
      id,
      plusItem,
      minusItem,
      deleteItem,
    } = this.props;

    return (
      <div>
        <img src={ productImage } alt={ productName } />
        <p data-testid="shopping-cart-product-name">{productName}</p>
        <p>{`R$ ${productPrice.toFixed(2)}`}</p>
        <div className="box-quantity">
          <span data-testid="shopping-cart-product-quantity">{quantity}</span>
        </div>
        <button
          type="button"
          onClick={ () => plusItem(quantity, id) }
          data-testid="product-increase-quantity"
        >
          +
        </button>
        <button
          type="button"
          value={ id }
          onClick={ () => deleteItem(id) }
        >
          x
        </button>
        <button
          type="button"
          onClick={ () => minusItem(quantity, id) }
          data-testid="product-decrease-quantity"
        >
          -
        </button>
      </div>
    );
  }
}

Items.propTypes = {
  productName: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  plusItem: PropTypes.func.isRequired,
  minusItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default Items;
