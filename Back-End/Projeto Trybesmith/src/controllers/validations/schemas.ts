import Joi from 'joi';

const productReqSchema = Joi.object({
  name: Joi.string().min(3).required(),
  amount: Joi.string().min(3).required(),
});

const userReqSchema = Joi.object({
  username: Joi.string().min(3).required(),
  classe: Joi.string().min(3).required(),
  level: Joi.number().min(1).required(),
  password: Joi.string().min(8).required(),
});

const orderReqSchema = Joi.object({
  productsIds: Joi.array().items(Joi.number()).min(1).required(),
});

export default {
  productReqSchema,
  userReqSchema,
  orderReqSchema,
};
