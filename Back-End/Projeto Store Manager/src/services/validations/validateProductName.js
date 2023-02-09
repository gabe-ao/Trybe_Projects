const { productNameSchema } = require('./schemas');

const validateProductName = (name) => {
    const { error } = productNameSchema.validate(name);
    if (error) {
        return {
            type: 'UNPROCESSABLE_ENTITY',
            message: '"name" length must be at least 5 characters long',
        };
    }
    return { type: null, message: '' };
};

module.exports = validateProductName;
