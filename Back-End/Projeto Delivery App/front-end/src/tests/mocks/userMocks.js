import stringGenerator from '../helpers/stringGenerator';
import tokenGenerator from '../helpers/tokenGenerator';

const minValidLengthOfUserName = 12;
const minValidLengthOfPassword = 6;
const randomEmailLength = 8;

const validUser = {
  name: stringGenerator(minValidLengthOfUserName),
  senha: stringGenerator(minValidLengthOfPassword),
  email: `${stringGenerator(randomEmailLength)}@email.com`,
};

const invalidUser = {
  name: 'Renato',
  senha: '1234',
  email: 'vi@rus@sem.no.cao.com',
};

const customerUser = {
  id: 3,
  name: 'Cliente Zé Birita',
  senha: '$#zebirita#$',
  email: 'zebirita@email.com',
  role: 'customer',
  senhaCriptografada: '1c37466c159755ce1fa181bd247cb925',
};

const adminUser = {
  id: 1,
  name: 'Delivery App Admin',
  senha: '--adm2@21!!--',
  email: 'adm@deliveryapp.com',
  role: 'administrator',
  senhaCriptografada: 'a4c86edecc5aee06eff8fdeda69e0d04',
};

const sellerUser = {
  id: 2,
  name: 'Fulana Pereira',
  senha: 'fulana@123',
  email: 'fulana@deliveryapp.com',
  role: 'seller',
  senhaCriptografada: '3c28d2b0881bf46457a853e0b07531c6',
};

const setUserLocalStorage = (user) => {
  const { id, name, email, role } = user;
  const localData = { name, email, role };
  localData.token = tokenGenerator({ id, name, email, role });
  return localData;
};

export {
  validUser,
  invalidUser,
  customerUser,
  adminUser,
  sellerUser,
  setUserLocalStorage,
};
