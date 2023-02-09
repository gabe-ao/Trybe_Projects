import React from 'react';
import PropTypes from 'prop-types';
import CheckoutProducts from '../components/CheckoutProducts';
import CheckoutForm from '../components/CheckoutForm';
import GoBackButton from '../components/GoBackButton';
import ShoppingCartButton from '../components/ShoppingCartButton';

class CheckoutPage extends React.Component {
  render() {
    const { items } = this.props;
    return (
      <section className="checkout-page">
        <h1>Finalização de Compra</h1>
        <GoBackButton />
        <ShoppingCartButton />
        <CheckoutProducts items={ items } />
        <CheckoutForm />
      </section>
    );
  }
}

CheckoutPage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CheckoutPage;
