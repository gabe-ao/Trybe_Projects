import Router from 'express';
import UserController from '../controllers/user.controller';
import ValidationController from '../controllers/validation.controller';
import 'express-async-errors';

const usersRouter = Router();
const userController = new UserController();
const validationController = new ValidationController();

usersRouter.post('/', validationController.newUserReq, userController.postUser);

export default usersRouter;
export { userController };
