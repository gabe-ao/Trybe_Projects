const Joi = require('joi');

const productNameSchema = Joi.string().min(5).required();

const salesObjSchema = Joi.object({
    productId: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required(),
});

module.exports = {
    productNameSchema,
    salesObjSchema,
};
