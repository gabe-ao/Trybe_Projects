import React from 'react';
import { Link } from 'react-router-dom';

class CheckoutButton extends React.Component {
  render() {
    return (
      <div>
        <Link to="/checkout" data-testid="checkout-products">
          <img
            className="checkout-image"
            width="40"
            height="40"
            src="https://cdn-icons-png.flaticon.com/512/7343/7343378.png"
            alt="Checkout icon by Bima Pamungkas, obtained from Flaticon.com"
          />
        </Link>
      </div>
    );
  }
}

export default CheckoutButton;
