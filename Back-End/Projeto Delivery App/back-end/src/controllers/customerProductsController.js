const customerProductsService = require('../services/customerProductsService');

const products = async (_req, res, next) => {
  try {    
    const allProducts = await customerProductsService.getProducts();
    return res.status(200).json(allProducts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  products,
};
