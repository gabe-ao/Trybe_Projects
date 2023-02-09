import Order from '../interfaces/order.interface';
import connection from '../models/connection';
import OrderModel from '../models/order.model';

class OrderService {
  public orderModel: OrderModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
  }

  public async listAllOrders(): Promise<Order[]> {
    const allOrders = await this.orderModel.selectAllOrders();
    return allOrders as Order[];
  }

  public async register(order: Order, productsIds: number[]): Promise<number> {
    const orderId = await this.orderModel.insert(order, productsIds);
    return orderId;
  }
}

export default OrderService;
