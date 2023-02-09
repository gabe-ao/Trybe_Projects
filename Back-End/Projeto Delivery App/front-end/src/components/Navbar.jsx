import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Navbar() {
  const history = useHistory();
  const [name, setName] = useState('');

  const logout = () => {
    localStorage.clear('user');
    history.push('/');
  };

  const getName = () => {
    let data = localStorage.getItem('user');
    data = JSON.parse(data);
    setName(data.name);
  };

  const goCurtomerproducts = () => {
    history.push('/customer/products');
  };

  const goCurtomerOrders = () => {
    history.push('/customer/orders');
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <nav>
      <section>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ () => goCurtomerproducts() }
        >
          PRODUTOS
        </button>

        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ () => goCurtomerOrders() }
        >
          MEUS PEDIDOS
        </button>
      </section>

      <section>
        <span
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { name }
        </span>

        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => logout() }
        >
          SAIR
        </button>
      </section>

    </nav>
  );
}

export default Navbar;
