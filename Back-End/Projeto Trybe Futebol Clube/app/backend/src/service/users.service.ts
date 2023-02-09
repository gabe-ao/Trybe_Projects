import usersModel from '../model/users.model';
import encryptService from './encrypt.service';
import Users from '../database/models/Users';
import loginReq from '../interfaces/loginRequisition';

async function userLogin(login: loginReq): Promise<Users> {
  const user = await usersModel.loginCheck(login.email);
  const isPasswordValid = await encryptService.validate(login.password, user.password);

  if (!isPasswordValid) {
    throw Error(JSON.stringify({ type: 'invalidUser', message: 'Incorrect email or password' }));
  }

  return user;
}

async function getUserData(id: number): Promise<Users> {
  const user = usersModel.getUserById(id);
  return user;
}

export default {
  userLogin,
  getUserData,
};
