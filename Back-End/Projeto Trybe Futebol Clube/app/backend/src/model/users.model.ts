import Users from '../database/models/Users';

async function loginCheck(email: string): Promise<Users> {
  const user: Users | null = await Users.findOne({
    attributes: ['id', 'username', 'password'],
    where: { email },
  });

  if (!user) {
    throw Error(JSON.stringify({ type: 'userNotFound', message: 'Incorrect email or password' }));
  }
  return user;
}

async function getUserById(id: number): Promise<Users> {
  const user: Users | null = await Users.findOne({
    attributes: { exclude: ['password'] },
    where: { id },
  });

  if (!user) {
    throw Error(JSON.stringify({ type: 'userNotFound', message: 'Unauthorized access' }));
  }
  return user;
}

export default {
  loginCheck,
  getUserById,
};
