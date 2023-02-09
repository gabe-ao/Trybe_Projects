import React from 'react';
import { Link } from 'react-router-dom';

class ShoppingCartButton extends React.Component {
  render() {
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">
          <img
            className="cart-image"
            width="40"
            height="40"
            src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
            alt="Shopping cart icon by Freepik.com, obtained from Flaticon.com"
          />
        </Link>
      </div>
    );
  }
}

export default ShoppingCartButton;
