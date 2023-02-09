const productsService = require('../services/products.service');
const errorMap = require('../utils/errorMap');

const getAllProducts = async (_req, res) => {
    const { type, message } = await productsService.listAllProducts();
    if (type) return res.status(500).json({ message: 'Internal Server Error!' });
    return res.status(200).json(message);
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await productsService.findProductById(id);
    if (type) return res.status(errorMap.errorStatus(type)).json({ message });

    res.status(200).json(message);
};

const postNewProduct = async (req, res) => {
    const { name } = req.body;
    const { type, message } = await productsService.addNewProduct(name);
    if (type) return res.status(errorMap.errorStatus(type)).json({ message });

    res.status(201).json(message);
};

const putProductName = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { type, message } = await productsService.changeProductName(name, id);
    if (type) return res.status(errorMap.errorStatus(type)).json({ message });

    res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await productsService.eliminateProduct(id);
    if (type) return res.status(errorMap.errorStatus(type)).json({ message });

    res.status(204).end();
};

module.exports = {
    getAllProducts,
    getProductById,
    postNewProduct,
    putProductName,
    deleteProduct,
};
