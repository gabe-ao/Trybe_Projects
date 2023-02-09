const { Category } = require('../models');

const createCategory = async (name) => {
    let category = await Category.findOne({ 
        where: { name },
    });
    if (category) {
        return { type: 'CATEGORY_ALREADY_REGISTERED', message: 'Category already registered' };
    }
    
    category = await Category.create({ name });
    return { type: null, message: category };
};

const selectAllCategories = async () => {
    const allCategories = await Category.findAll();
    return { type: null, message: allCategories };
};

module.exports = {
    createCategory,
    selectAllCategories, 
};
