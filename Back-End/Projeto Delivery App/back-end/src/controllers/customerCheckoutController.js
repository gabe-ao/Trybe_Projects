const customerCheckoutService = require('../services/customerCheckoutService');

const postSales = async (req, res, next) => {
  try {
    const { newSale, newPro } = req.body;
    const returnCreateSale = await customerCheckoutService.createNewSales(newSale);
    newPro.map(async (ma) => {
      await customerCheckoutService.createNewSalesProducts(
        returnCreateSale.id,
        ma.productId,
        ma.quantity,
      );
    });
    return res.status(201).json({ rec: returnCreateSale, message: 'created' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postSales,
};
