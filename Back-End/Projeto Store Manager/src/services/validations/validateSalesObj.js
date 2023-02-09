const { salesObjSchema } = require('./schemas');

const validateSalesObj = (sales) => {
    let contract = { type: null, message: '' };
    sales.forEach((sale) => { 
        const { error } = salesObjSchema.validate(sale);
        if (error) {
            contract = {
                type: 'UNPROCESSABLE_ENTITY',
                message: error.message,
            };
        }
    });

    return contract;
};

module.exports = validateSalesObj;
