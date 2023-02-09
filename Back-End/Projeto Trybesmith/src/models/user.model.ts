import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import User from '../interfaces/user.interface';

class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async insert(user: User): Promise<User> {
    const { username, classe, level, password } = user;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );

    return { id: insertId, username } as User;
  }

  public async selectLogin(username: string, password: string): Promise<User> {
    const [[userFound]] = await this.connection.execute<RowDataPacket[]>(
      'SELECT id, username FROM Trybesmith.Users WHERE username = ? AND password = ?',
      [username, password],
    );
    
    if (!userFound) throw Error('Username or password invalid');    
    return { id: userFound.id, username } as User;
  }
}

export default UserModel;