const dataTestsId = (productId) => {
  const prefixoCP = 'customer_products__';

  const cardPrince = `${prefixoCP}element-card-price-${productId}`;
  const cardTitle = `${prefixoCP}element-card-title-${productId}`;
  const cardBgImage = `${prefixoCP}img-card-bg-image-${productId}`;
  const cardRmItem = `${prefixoCP}button-card-rm-item-${productId}`;
  const cardQuantity = `${prefixoCP}input-card-quantity-${productId}`;
  const cardAddItem = `${prefixoCP}button-card-add-item-${productId}`;

  const orderDate = `${prefixoCP}element-order-date-${productId}`;

  const prefix = 'customer_orders__';

  const orderId = `${prefix}element-order-id-${productId}`;
  const orderStatus = `${prefix}element-delivery-status-${productId}`;
  const elementOrderDate = `${prefix}element-order-date-${productId}`;
  const orderPrice = `${prefix}element-card-price-${productId}`;

  const prefixAdmin = 'admin_manage__';

  const nomeList = `${prefixAdmin}input-email-${productId}`;

  const itemList = `${prefixAdmin}element-user-table-item-number-${productId}`;
  const emailList = `${prefixAdmin}element-user-table-email-${productId}`;
  const namelList = `${prefixAdmin}element-user-table-name-${productId}`;
  const tipoList = `${prefixAdmin}element-user-table-role-${productId}`;
  const excluirList = `${prefixAdmin}element-user-table-remove-${productId}`;

  const buttonRegister = `${prefixAdmin}button-register`;
  return {
    cardPrince,
    cardTitle,
    cardBgImage,
    cardRmItem,
    cardQuantity,
    cardAddItem,
    orderDate,
    orderId,
    orderStatus,
    orderPrice,
    elementOrderDate,
    itemList,
    nomeList,
    emailList,
    tipoList,
    excluirList,
    buttonRegister,
    namelList,
  };
};

export default dataTestsId;
