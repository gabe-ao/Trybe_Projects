const { Product } = require('../database/models');

const getProducts = async () => {
  const allProducts = await Product.findAll();
  return allProducts;
};

module.exports = {
  getProducts,
};
