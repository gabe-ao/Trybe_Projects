import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async selectAllOrders(): Promise<Order[]> {
    const [allOrders] = await this.connection.execute<RowDataPacket[]>(
      `SELECT O.id, O.userId, JSON_ARRAYAGG(P.id) AS 'productsIds'
      FROM Trybesmith.Orders AS O
      LEFT JOIN Trybesmith.Products AS P
      ON O.id = P.orderId
      GROUP BY O.id`,
    );

    return allOrders as Order[];
  }

  public async insert({ userId }: Order, productsIds: number[]): Promise<number> {
    const [{ insertId: orderId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    
    const productsPlaceholder = productsIds.map((_id) => '?').join(', ');
    await this.connection.execute<ResultSetHeader>(
      `UPDATE Trybesmith.Products SET orderId = ? WHERE id IN (${productsPlaceholder})`,
      [orderId, ...productsIds],
    );

    return orderId;
  }
}

export default OrderModel;
