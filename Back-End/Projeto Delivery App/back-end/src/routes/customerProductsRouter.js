const express = require('express');
const customerProductsController = require('../controllers/customerProductsController');

const router = express.Router();

router.get('/customer/products', customerProductsController.products);

module.exports = router;
