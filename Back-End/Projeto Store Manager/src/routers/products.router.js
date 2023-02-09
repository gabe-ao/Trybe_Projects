const express = require('express');
const productsController = require('../controllers/products.controller');
const validateProductFields = require('../middlewares/validateProductFields');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getAllProducts);

productsRouter.get('/:id', productsController.getProductById);

productsRouter.post('/',
    validateProductFields,
    productsController.postNewProduct);

productsRouter.put('/:id',
    validateProductFields,
    productsController.putProductName);

productsRouter.delete('/:id', productsController.deleteProduct);

module.exports = productsRouter;
