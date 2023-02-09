const express = require('express');
const generateToken = require('../middlewares/generateToken');
const validateLogin = require('../middlewares/validateLogin');

const loginRouter = express.Router();

loginRouter.post('/', validateLogin, generateToken);

module.exports = loginRouter;
