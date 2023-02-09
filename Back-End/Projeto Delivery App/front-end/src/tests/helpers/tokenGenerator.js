import jwt from 'jsonwebtoken';

require('dotenv/config');

const JWT_SECRET = process.env.JWT_SECRET || 'segredoJWT';

const tokenGenerator = (user) => {
  const jwtConfig = {
    expiresIn: '20d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(user, JWT_SECRET, jwtConfig);

  return token;
};

export default tokenGenerator;
