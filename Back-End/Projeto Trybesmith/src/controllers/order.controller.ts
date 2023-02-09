import { Request, Response } from 'express';
import OrderService from '../services/order.service';

class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAllOrders = async (_req: Request, res: Response): Promise<void> => {
    const allOrders = await this.orderService.listAllOrders();
    res.status(200).json(allOrders).end();
  };

  public postOrder = async (req: Request, res: Response): Promise<void> => {
    const { productsIds, user } = req.body;
    await this.orderService.register({ userId: user.id }, productsIds);

    res.status(201).json({ userId: user.id, productsIds });
  };
}

export default OrderController;
