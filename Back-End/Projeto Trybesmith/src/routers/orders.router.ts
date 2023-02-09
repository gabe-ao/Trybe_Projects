import Router from 'express';
import OrderController from '../controllers/order.controller';
import ValidationController from '../controllers/validation.controller';
import 'express-async-errors';

const ordersRouter = Router();
const orderController = new OrderController();
const validationController = new ValidationController();

ordersRouter.get('/', orderController.getAllOrders);
ordersRouter.post('/', validationController.newOrderReq, orderController.postOrder);

export default ordersRouter;
