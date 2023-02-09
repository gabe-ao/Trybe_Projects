const { Sales, SalesProducts } = require('../database/models');

const createNewSales = async (newSale) => {
  const postSales = await Sales.create({
    userId: newSale.userId,
    sellerId: newSale.sellerId,
    totalPrice: newSale.totalPrice,
    deliveryAddress: newSale.deliveryAddress,
    deliveryNumber: newSale.deliveryNumber,
    saleDate: new Date(),
    status: 'Pendente',
  });
    return postSales;
  };
  
const createNewSalesProducts = async (id, pId, qntty) => {
  const postSalesProducts = await SalesProducts.create({
    saleId: id,
    productId: pId,
    quantity: qntty,
  });
  return postSalesProducts;
 };

module.exports = {
  createNewSales,
  createNewSalesProducts,
};
