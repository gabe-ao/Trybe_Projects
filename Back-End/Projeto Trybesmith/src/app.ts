import express from 'express';
import productsRouter from './routers/products.router';
import usersRouter, { userController } from './routers/user.router';
import ordersRouter from './routers/orders.router';
import ValidationController from './controllers/validation.controller';
import errorController from './controllers/error.controller';
import 'express-async-errors';

const validationController = new ValidationController();
const app = express();
app.use(express.json());

app.post('/login', validationController.loginValidation, userController.postLogin);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use(errorController.errorToResponse);

export default app;
