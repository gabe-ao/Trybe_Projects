import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import TokenPayload from '../interfaces/tokenPayload.interface'; 

dotenv.config();
const secret = process.env.JWT_SECRET as string;

const createToken = (payload: object): string => {
  const jwtConfig: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '12h',
  };
  
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

const validateToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, secret) as TokenPayload;
    const { id, username } = decoded;
    return { id, username };
  } catch (error) {
    throw Error('Invalid token');
  }
};

export default {
  createToken,
  validateToken,
};
