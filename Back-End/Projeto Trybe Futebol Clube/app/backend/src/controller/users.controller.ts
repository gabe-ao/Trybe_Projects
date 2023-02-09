import { Request, Response } from 'express';
import usersService from '../service/users.service';
import authController from './auth.controller';
import loginReq from '../interfaces/loginRequisition';

async function postLogin(req: Request, res: Response): Promise<void> {
  const { email, password }: loginReq = req.body;
  const user = await usersService.userLogin({ email, password });

  const { id, username } = user;
  const token = authController.createUserAuth({ id, username });
  res.status(200).json({ token });
}

async function validateUser(req: Request, res: Response): Promise<void> {
  const token = req.header('authorization');
  if (!token) throw Error(JSON.stringify({ type: 'emptyToken', message: 'Token is required' }));

  const authPayload = authController.validateUserToken(token);
  const { role } = await usersService.getUserData(authPayload.id);
  res.status(200).json({ role });
}

export default {
  postLogin,
  validateUser,
};
