import { PropTypes } from 'prop-types';
import React from 'react';
import CheckoutButton from '../components/CheckoutButton';
import GoBackButton from '../components/GoBackButton';
import Items from '../components/Items';

class ShoppingCartPage extends React.Component {
  render() {
    const { items, plusItem, minusItem, deleteItem } = this.props;

    return (
      <div className="box-shopping-cart">
        <GoBackButton />
        <CheckoutButton />
        {items.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={ item.id }>
                <Items
                  productName={ item.title }
                  productImage={ item.thumbnail }
                  productPrice={ item.price }
                  quantity={ item.quantity }
                  id={ item.id }
                  plusItem={ plusItem }
                  minusItem={ minusItem }
                  deleteItem={ deleteItem }
                />
              </li>
            ))}
          </ul>

        )}
      </div>
    );
  }
}

ShoppingCartPage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  plusItem: PropTypes.func.isRequired,
  minusItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default ShoppingCartPage;
