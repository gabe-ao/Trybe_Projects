const categoriesService = require('../services/categories.service');
const { errorMapper } = require('../utils/errorMapper');

const postCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(errorMapper('NAME_NOT_FOUND')).json({ message: '"name" is required' });
    }

    const { type, message } = await categoriesService.createCategory(name);
    if (type) return res.status(errorMapper(type)).json({ message });
    return res.status(201).json(message);
};

const getCategories = async (_req, res) => {
    try {
        const { message } = await categoriesService.selectAllCategories();
        return res.status(200).json(message);
    } catch (error) {
        return res.status(errorMapper('INTERNAL_ERROR')).json({ message: 'Internal server error' });
    }
};

module.exports = {
    postCategory,
    getCategories,
};
