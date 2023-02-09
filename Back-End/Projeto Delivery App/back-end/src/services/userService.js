const md5 = require('md5');
const Joi = require('joi');
const errorGenerate = require('../utils/genericErrorHandler');
const { User } = require('../database/models');
const { generateToken } = require('../utils/JWT');

const emailRegex = /^[a-z0-9-_.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

const userSchema = Joi.object({
  email: Joi.string().regex(emailRegex).required(),
  password: Joi.string().required().min(6),
});

const authenticate = async (userEmail, userPassword) => {
  const cryptoPassword = md5(userPassword);
  const { error } = userSchema.validate({ email: userEmail, password: userPassword });
  if (error) throw errorGenerate(400, 'Some required fields are missing');

  const user = await User.findOne({
    attributes: ['id', 'name', 'email', 'role'],
    where: { email: userEmail, password: cryptoPassword },
  });

  if (!user) throw errorGenerate(404, 'Not found');

  const token = generateToken(user.dataValues);

  const { id, name, email, role } = user.dataValues;
  return { id, name, email, role, token };
};

const createUser = async ({ name, email, password }) => {
  const cryptoPassword = md5(password);
  const checkCreatedUsers = await User.findOne({
    where: {
      email,
    },
  });

  if (checkCreatedUsers) {
    throw errorGenerate(409, 'User already registered');
  }
  const newUser = await User.create({ name, email, password: cryptoPassword, role: 'customer' });
  const { id, role } = newUser.dataValues;
  const token = generateToken({ id, name, email, role });
  return token;
};

const createUserPanelAdmin = async (body) => {
  const { name, email, password, role } = body;
  const cryptoPassword = md5(password);
  const checkCreatedUsers = await User.findOne({
    where: {
      email,
    },
  });
  if (checkCreatedUsers) {
    throw errorGenerate(409, 'User already registered');
  }
  const newUser = await User.create({ name, email, password: cryptoPassword, role });
  const token = generateToken(newUser.dataValues);
  return token;
};

const getSellers = async () => {
  const sellers = await User.findAll({
    attributes: ['id', 'name'],
    where: {
      role: 'seller',
    },
  });
  return sellers;
};

const getUsers = async () => {
  const users = await User.findAll({
    attributes: ['name', 'email', 'role'],
  });
  return users;
};

const getUserId = async (name) => {
  const users = await User.findOne({
    attributes: ['name', 'email', 'role'],
    where: { name },
  });
  return users;
};

module.exports = {
  authenticate,
  createUser,
  getSellers,
  getUsers,
  createUserPanelAdmin,
  getUserId,
};
