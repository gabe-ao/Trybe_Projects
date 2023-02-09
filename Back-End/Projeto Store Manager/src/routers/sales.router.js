const express = require('express');
const salesController = require('../controllers/sales.controller');
const validateSalesFields = require('../middlewares/validateSalesFields');

const salesRouter = express.Router();

salesRouter.post('/', validateSalesFields,
    salesController.postNewSales);

salesRouter.get('/', salesController.getAllSales);

salesRouter.get('/:id', salesController.getSaleById);

salesRouter.delete('/:id', salesController.deleteSale);

module.exports = salesRouter;
