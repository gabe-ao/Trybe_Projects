import { sign, verify, SignOptions } from 'jsonwebtoken';
import AuthPayload from '../interfaces/authPayload';
import 'dotenv/config';

class AuthController {
  private secret = 'd3F4Ul7';
  private jwtConfig: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '12h',
  };

  constructor(secret?: string, jwtConfig?: SignOptions) {
    if (secret) this.secret = secret;
    else if (process.env.JWT_SECRET) this.secret = process.env.JWT_SECRET;
    if (jwtConfig) this.jwtConfig = jwtConfig;
  }

  public createUserAuth = (payload: AuthPayload): string => {
    const token = sign(payload, this.secret, this.jwtConfig);
    return token;
  };

  public validateUserToken = (token: string): AuthPayload => {
    try {
      const decoded = verify(token, this.secret) as AuthPayload;
      return decoded;
    } catch (error) {
      throw new Error(JSON.stringify({ type: 'invalidToken',
        message: 'Token must be a valid token' }));
    }
  };
}

export default new AuthController();

export { AuthController };
