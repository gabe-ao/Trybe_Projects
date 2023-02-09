const customerOrdersService = require('../services/customerOrdersService');

const sales = async (_req, res, next) => {
  try {
    const allSales = await customerOrdersService.getSales();
    return res.status(200).json(allSales);
  } catch (error) {
    next(error);
  }
};

const salesId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allSales = await customerOrdersService.getSalesId(id);
    return res.status(200).json(allSales);
  } catch (error) {
    next(error);
  }
};

const updateSalesId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const saleUpdate = await customerOrdersService.updateSalesId(id, status);
    return res.status(200).json(saleUpdate);
  } catch (error) {
    next(error);
  }
};

const salesProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allSalesProducts = await customerOrdersService.getSalesProducts(id);
    return res.status(200).json(allSalesProducts);
  } catch (error) {
    next(error);
  }
};

const salesProductsId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allSalesProducts = await customerOrdersService.salesProductsId(id);
    return res.status(200).json(allSalesProducts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sales,
  salesId,
  salesProducts,
  salesProductsId,
  updateSalesId,
};
