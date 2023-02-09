const express = require('express');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.get('/sale/:id', saleController.getSaleBuId);

module.exports = router;
