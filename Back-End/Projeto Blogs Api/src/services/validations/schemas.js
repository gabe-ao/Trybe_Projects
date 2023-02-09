const Joi = require('joi');

const newUserSchema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
}).required();

const blogPostSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number().integer()).min(1).unique()
        .required(),
}).required();

module.exports = {
    newUserSchema,
    blogPostSchema,
};
