const { Sales, SalesProducts } = require('../database/models');

const getSales = async () => {
  const allSales = await Sales.findAll();
  return allSales;
};

const getSalesId = async (id) => {
  const allSales = await Sales.findOne({
    where: {
      id,
    },
  });
  return allSales;
};

const updateSalesId = async (id, status) => {
  const saleUpdate = await Sales.update(
    { status },
    { where: { id } },
  );
  return saleUpdate;
};

const getSalesProducts = async (id) => {
  const allSalesProducts = await SalesProducts.findAll({
    where: {
      saleId: id,
    },
  }); 
   return allSalesProducts;
};

const salesProductsId = async (id) => {
  const findSaleProduct = await SalesProducts.findAll({
    where: { saleId: id },
  });
  return findSaleProduct;
};

module.exports = {
  getSales,
  getSalesId,
  getSalesProducts,
  salesProductsId,
  updateSalesId,
};
