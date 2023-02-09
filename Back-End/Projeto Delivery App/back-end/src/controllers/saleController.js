const saleService = require('../services/saleService');

const getSaleBuId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const returnSaleId = await saleService.getSaleBuId(id);
    return res.status(200).json(returnSaleId);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSaleBuId,
};
