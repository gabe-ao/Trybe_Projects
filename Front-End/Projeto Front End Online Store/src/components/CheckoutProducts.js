import React from 'react';
import PropTypes from 'prop-types';

class CheckoutProducts extends React.Component {
  render() {
    const { items } = this.props;
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return (
      <section className="checkout-products">
        <h2>Revise seus produtos</h2>
        { items.map((item) => (
          <div key={ `${item.id}` } className="checkout-item">
            <hr />
            <figure>
              <figcaption>{ item.title }</figcaption>
              <img
                src={ item.thumbnail }
                alt={ item.title }
                width="100px"
                height="100px"
              />
            </figure>
            <data value={ `${item.quantity}` }>{`Quantidade:${item.quantity}`}</data>
            <p>
              <data value={ `${item.price}` }>{`Preço: R$ ${item.price}`}</data>
            </p>
            <hr />
          </div>
        ))}
        <p>
          { 'Preço Total: R$ ' }
          <data value={ totalPrice }>{ totalPrice }</data>
        </p>
      </section>
    );
  }
}

CheckoutProducts.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CheckoutProducts;
