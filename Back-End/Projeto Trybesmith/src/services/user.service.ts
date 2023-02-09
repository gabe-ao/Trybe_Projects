import connection from '../models/connection';
import User from '../interfaces/user.interface';
import UserModel from '../models/user.model';

class UserService {
  public userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);
  }

  public async register(user: User): Promise<User> {
    const newUser: User = await this.userModel.insert(user);
    return newUser;
  }

  public async login(username: string, password: string): Promise<User> {
    const loggedUser: User = await this.userModel.selectLogin(username, password);
    return loggedUser;
  }
}

export default UserService;
