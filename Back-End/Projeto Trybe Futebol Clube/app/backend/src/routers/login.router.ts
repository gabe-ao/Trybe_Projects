import { Router } from 'express';
import usersController from '../controller/users.controller';
import validationController from '../controller/validation.controller';
import 'express-async-errors';

const loginRouter = Router();

loginRouter.post('/', validationController.validateLoginReq, usersController.postLogin);
loginRouter.get('/validate', usersController.validateUser);

export default loginRouter;
