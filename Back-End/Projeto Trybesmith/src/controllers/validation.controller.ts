import { Request, Response, NextFunction } from 'express';
import schemas from './validations/schemas';
import authController from './auth.controller';

class ValidationController {
  public loginValidation = async (req: Request, _res: Response, next: NextFunction)
  : Promise<void> => {
    const { username, password } = req.body;
    if (!username) throw Error('"username" is required');
    if (!password) throw Error('"password" is required');
    next();
  };

  public newProductReq = async (req: Request, _res: Response, next: NextFunction)
  : Promise<void> => {
    const { name, amount } = req.body;
    const { error } = schemas.productReqSchema.validate({ name, amount });

    if (error) throw Error(`${error.message}`);
    next();
  };

  public newUserReq = async (req: Request, _res: Response, next: NextFunction)
  : Promise<void> => {
    const { username, classe, level, password } = req.body;
    const { error } = schemas.userReqSchema.validate({ username, classe, level, password });

    if (error) throw Error(`${error.message}`);
    next();
  };

  public newOrderReq = async (req: Request, _res: Response, next: NextFunction)
  : Promise<void> => {
    const token = req.header('Authorization');
    if (!token) throw Error('Token not found');
    req.body.user = authController.validateToken(token);

    const { productsIds } = req.body;
    if (!productsIds) throw Error('"productsIds" is required');
    if (productsIds.length === 0) throw Error('"productsIds" must include only numbers');
    
    const { error } = schemas.orderReqSchema.validate({ productsIds });
    if (error) throw Error(`${error.message}`);
    next();
  };
}

export default ValidationController;
