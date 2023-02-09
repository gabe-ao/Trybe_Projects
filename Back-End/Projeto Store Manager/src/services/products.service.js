const productsModel = require('../models/products.model');
const validateProductName = require('./validations/validateProductName');

const listAllProducts = async () => {
    const result = await productsModel.selectAllProducts();
    return { type: null, message: result };
};

const findProductById = async (productId) => {
    const product = await productsModel.selectProductById(productId);
    if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
    return { type: null, message: product };
};

const addNewProduct = async (name) => {
    const error = validateProductName(name);
    if (error.type) return error;
    
    const newId = await productsModel.insertNewProduct(name);
    const insertedProduct = await productsModel.selectProductById(newId);
    return { type: null, message: insertedProduct };
};

const changeProductName = async (newName, productId) => {
    const error = validateProductName(newName);
    if (error.type) return error;

    const doesIdExists = await productsModel.selectProductById(productId);
    if (!doesIdExists) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

    await productsModel.updateProduct(newName, productId);
    return { type: null, message: { id: productId, name: newName } };
};

const eliminateProduct = async (productId) => {
    const doesIdExists = await productsModel.selectProductById(productId);
    if (!doesIdExists) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

    await productsModel.eraseProduct(productId);
    return { type: null, message: '' };
};

module.exports = {
    listAllProducts,
    findProductById,
    addNewProduct,
    changeProductName,
    eliminateProduct,
};
