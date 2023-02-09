import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import dataTestsNoId from '../utils/dataTests/dataTestNoId';

function NavbarAdmin() {
  const [nameNavBar, setNameNavBar] = useState('');
  const history = useHistory();

  const goAdminManager = () => {
    history.push('/admin/manage');
  };

  const getName = () => {
    let data = localStorage.getItem('user');
    data = JSON.parse(data);
    setNameNavBar(data.name);
    if (data.role !== 'administrator') {
      localStorage.clear('user');
      history.push('/login');
    }
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
        data-testid={ dataTestsNoId().navbarLinkOrders }
        onClick={ () => goAdminManager() }
      >
        GERENCIAR USUÁRIOS
      </button>
      <span
        data-testid={ dataTestsNoId().navbarUserFullName }
      >
        { nameNavBar }
      </span>

      <button
        type="button"
        data-testid={ dataTestsNoId().navbarLinkLogout }
        onClick={ () => logout() }
      >
        SAIR
      </button>
    </section>
  );
}

export default NavbarAdmin;
