const jwt = require('jsonwebtoken');
const errorGenerate = require('./genericErrorHandler');
require('dotenv/config');

const JWT_SECRET = process.env.JWT_SECRET || 'segredoJWT';

const generateToken = (user) => {
  const jwtConfig = {
    expiresIn: '20d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(user, JWT_SECRET, jwtConfig);

  return token;
};

const tokenDescrypt = (token) => jwt.decode(token);

const authenticateToken = async (token, _next) => {
  if (!token) {
    const status = 401;
    const message = 'missing token';
    throw errorGenerate(status, message);
  } 
  try {
    const validateToken = jwt.verify(token, JWT_SECRET);
    return validateToken;
  } catch (error) {
    const status = 401;
    const message = 'Expired or invalid token';
    throw errorGenerate(status, message);
  }
};

module.exports = {
  generateToken,
  authenticateToken,
  tokenDescrypt,
};
