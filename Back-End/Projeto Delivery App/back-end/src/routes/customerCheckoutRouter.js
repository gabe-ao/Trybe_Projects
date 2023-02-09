const express = require('express');
const customerCheckoutController = require('../controllers/customerCheckoutController');

const router = express.Router();

router.post('/customer/checkout', customerCheckoutController.postSales);

module.exports = router;
