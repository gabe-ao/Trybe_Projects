const express = require('express');
const categoriesController = require('../controllers/categories.controller');
const validateJWT = require('../middlewares/validateJWT');

const categoriesRouter = express.Router();

categoriesRouter.post('/', validateJWT, categoriesController.postCategory);
categoriesRouter.get('/', validateJWT, categoriesController.getCategories);

module.exports = categoriesRouter;
