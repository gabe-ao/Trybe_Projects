const dataTestsNoId = () => {
  const prefixoCP = 'customer_products__';

  const buttonCart = `${prefixoCP}button-cart`;
  const buttonValue = `${prefixoCP}checkout-bottom-value`;

  const prefix = 'admin_manage__';

  const navbarLinkLogout = `${prefixoCP}element-navbar-link-logout`;
  const navbarLinkOrders = `${prefixoCP}element-navbar-link-orders`;

  const inputName = `${prefix}input-name`;
  const inputEmail = `${prefix}input-email`;
  const inputPassword = `${prefix}input-password`;
  const inputRole = `${prefix}select-role`;
  const inputButton = `${prefix}button-register`;

  const invalidButtonRegister = `${prefix}element-invalid-register`;
  return {
    buttonCart,
    buttonValue,
    inputName,
    inputEmail,
    inputPassword,
    inputRole,
    invalidButtonRegister,
    navbarLinkLogout,
    navbarLinkOrders,
    inputButton,
  };
};

export default dataTestsNoId;
