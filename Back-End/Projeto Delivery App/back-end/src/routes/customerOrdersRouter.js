const express = require('express');
const customerOrdersController = require('../controllers/customerOrdersController');

const router = express.Router();

router.get('/customer/orders', customerOrdersController.sales);

router.get('/customer/orders/:id', customerOrdersController.salesId);

router.get('/salesProducts/:id', customerOrdersController.salesProducts);

router.put('/salesProducts/:id', customerOrdersController.updateSalesId);

router.get('/seller/orders/:id', customerOrdersController.salesProductsId);

module.exports = router;
