import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [token] = useState('');
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [cardValuePrinces, setCardValuePrinces] = useState(0);
  const [pageCheckout, setPageCheckout] = useState('');
  const [pageOrders, setPageOrders] = useState([]);
  const [pageOrdersIds, setPageOrdersIds] = useState([]);
  const [ordersList, setOrdersList] = useState([]);

  const memorize = React.useMemo(() => ({
    token,
    pageCheckout,
    setPageCheckout,
    products,
    setProducts,
    quantity,
    setQuantity,
    cardValuePrinces,
    setCardValuePrinces,
    pageOrders,
    setPageOrders,
    pageOrdersIds,
    setPageOrdersIds,
    ordersList,
    setOrdersList,
  }), [
    token,
    pageCheckout,
    setPageCheckout,
    products,
    setProducts,
    quantity,
    setQuantity,
    cardValuePrinces,
    setCardValuePrinces,
    pageOrders,
    setPageOrders,
    pageOrdersIds,
    setPageOrdersIds,
    ordersList,
    setOrdersList,
  ]);
  return (
    <Context.Provider
      value={ memorize }
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
