import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function NavbarAdmin() {
  const [nameNavBar, setNameNavBar] = useState('');
  const history = useHistory();

  const goAdminManager = () => {
    history.push('/seller/orders');
  };

  const getName = () => {
    let data = localStorage.getItem('user');
    data = JSON.parse(data);
    setNameNavBar(data.name);
  };

  const logout = () => {
    localStorage.clear('user');
    history.push('/');
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <section>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-orders"
        onClick={ () => goAdminManager() }
      >
        PEDIDOS
      </button>
      <span
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { nameNavBar }
      </span>

      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => logout() }
      >
        SAIR
      </button>
    </section>
  );
}

export default NavbarAdmin;
