const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');
const validateSalesObj = require('./validations/validateSalesObj');

const registerSales = async (sales) => {
    const error = validateSalesObj(sales);
    if (error.type) return error;

    const productsFound = await productsModel.selectMultipleProducts(sales);
    if (productsFound.length !== sales.length) {
        return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    }

    const salesId = await salesModel.insertSales();
    await salesModel.insertSalesProducts(salesId, sales);
    return { type: null, message: { id: salesId, itemsSold: sales } };
};

const listAllSales = async () => {
    const sales = await salesModel.selectAllSales();
    return { type: null, message: sales };
};

const findSaleById = async (salesId) => {
    const sale = await salesModel.selectSaleById(salesId);
    if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
    return { type: null, message: sale };
};

const eliminateSale = async (saleId) => {
    const doesSaleExists = await salesModel.selectSaleById(saleId);
    if (doesSaleExists.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

    await salesModel.eraseSale(saleId);
    return { type: null, message: '' };
};

module.exports = {
    registerSales,
    listAllSales,
    findSaleById,
    eliminateSale,
};
