const salesService = require('../services/sales.service');
const errorMap = require('../utils/errorMap');

const postNewSales = async (req, res) => {
    const sales = req.body;
    const { type, message } = await salesService.registerSales(sales);
    if (type) return res.status(errorMap.errorStatus(type)).json({ message });
    
    res.status(201).json(message);
};

const getAllSales = async (_req, res) => {
    const { message } = await salesService.listAllSales();
    return res.status(200).json(message);
};

const getSaleById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await salesService.findSaleById(id);
    if (type) return res.status(errorMap.errorStatus(type)).json({ message });
    
    return res.status(200).json(message);
};

const deleteSale = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await salesService.eliminateSale(id);
    if (type) return res.status(errorMap.errorStatus(type)).json({ message });

    return res.status(204).end();
};

module.exports = {
    postNewSales,
    getAllSales,
    getSaleById,
    deleteSale,
};
