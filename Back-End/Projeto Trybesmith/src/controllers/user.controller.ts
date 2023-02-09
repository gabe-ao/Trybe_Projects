import { Request, Response } from 'express';
import authController from './auth.controller';
import UserService from '../services/user.service';

class UserController {
  constructor(private userService = new UserService()) {}

  public postUser = async (req: Request, res: Response): Promise<void> => {
    const { username, classe, level, password } = req.body;
    const newUser = await this.userService.register({ username, classe, level, password });
    if (!newUser) res.sendStatus(500);
    
    const token: string = authController.createToken(newUser);
    res.status(201).json({ token });
  };

  public postLogin = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const loggedUser = await this.userService.login(username, password);
    
    const token: string = authController.createToken(loggedUser);
    res.status(200).json({ token });
  };
}

export default UserController;
