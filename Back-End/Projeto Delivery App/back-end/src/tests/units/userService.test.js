const { expect } = require('chai');
const sinon = require('sinon');

const { User } = require('../../database/models');
const { authenticate, createUser } = require('../../services/userService');
const { adminUser, findOneUser, loginRes,
  invalidUser, mockCreateUser } = require('../mocks/userMocks');

describe('#### Avalia camada userService ####', function () {
  afterEach(() => sinon.restore());
  
  it('1 - Autentica login válido?', async function () {
    sinon.stub(User, 'findOne').resolves(findOneUser(adminUser));

    const response = await authenticate(adminUser.email, adminUser.passwordPlain);
    expect(response).deep.equal(loginRes(adminUser));
  });

  it('2 - Rejeita login com senha inválido?', async function () {
    try {
      await authenticate(adminUser.email, invalidUser.passwordPlain);
    } catch (error) {
      expect(error).deep.equal({ status: 400, message: 'Some required fields are missing' });
    }
  });

  it('3 - Rejeita login com email inválido?', async function () {
    try {
      await authenticate(invalidUser.email, adminUser.passwordPlain);
    } catch (error) {
      expect(error).deep.equal({ status: 400, message: 'Some required fields are missing' });
    }
  });

  it('4 - Retorna erro quando o usuário não é encontrado?', async function () {
    sinon.stub(User, 'findOne').resolves(null);

    try {
      await authenticate(adminUser.email, adminUser.passwordPlain);
    } catch (error) {
      expect(error).deep.equal({ status: 404, message: 'Not found' });
    }
  });

  it('5 - Cria um novo usuário com sucesso?', async function () {
    sinon.stub(User, 'findOne').resolves(null);
    sinon.stub(User, 'create').resolves(mockCreateUser(adminUser));

    const { name, email, passwordPlain: password } = adminUser;
    const result = await createUser({ name, email, password });
    expect(result).equal(loginRes(adminUser).token);
  });

  it('6 - Lança erro quando tenta criar usuário já existente?', async function () {
    sinon.stub(User, 'findOne').resolves(findOneUser(adminUser));
    sinon.stub(User, 'create').resolves(mockCreateUser(adminUser));

    const { name, email, passwordPlain: password } = adminUser;
    try {
      await createUser({ name, email, password });
    } catch (error) {
      expect(error).deep.equal({ status: 409, message: 'User already registered' });
    }
  });
});