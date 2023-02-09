const { expect } = require('chai');
const sinon = require('sinon');

const userService = require('../../services/userService');
const userController = require('../../controllers/userController');
const { loginRes, sellerUser } = require('../mocks/userMocks');

describe('#### Avalia camada userController ####', function () {
  const reqBody = { name: sellerUser.name, email: sellerUser.email, password: sellerUser.passwordPlain };
  const mockRequest = { body: reqBody };
  const sendSpy = sinon.spy();
  const jsonSpy = sinon.spy();
  const statusSpy = sinon.spy(function () { return { json: jsonSpy } });
  const mockResponse = { send: sendSpy, status: statusSpy };
  const nextSpy = sinon.spy();

  afterEach(() => {
    sinon.restore();
    statusSpy.resetHistory();
    jsonSpy.resetHistory();
    sendSpy.resetHistory();
    nextSpy.resetHistory();
  });

  it('1 - Retorna a validação de login com sucesso?', async function () {
    const sellerRes = loginRes(sellerUser);
    sinon.stub(userService, 'authenticate').resolves(sellerRes);

    await userController.user(mockRequest, mockResponse, nextSpy);
    expect(sendSpy.calledOnce).true;
    expect(sendSpy.calledWith(sellerRes)).true;
    expect(nextSpy.notCalled).true;
  });

  it('2 - O controlador user lança erros corretamente?', async function () {
    const testError = new Error('Testerson is testing...');
    sinon.stub(userService, 'authenticate').throws(testError);
    
    await userController.user(mockRequest, mockResponse, nextSpy);
    expect(nextSpy.calledOnce).true;
    expect(nextSpy.calledWith(testError)).true;
    expect(sendSpy.notCalled).true;
  });

  it('3 - Retorna mensagem de usuário criado com sucesso?', async function () {
    sinon.stub(userService, 'createUser').resolves();

    await userController.createUser(mockRequest, mockResponse, nextSpy);
    expect(statusSpy.calledOnce).true;
    expect(statusSpy.calledWith(201)).true;
    expect(jsonSpy.calledOnce).true;
    expect(jsonSpy.calledWith('created')).true;
    expect(nextSpy.notCalled).true;
  });

  it('4 - O controlador createUser lança erros corretamente?', async function () {
    const testError = new Error('Testerson is testing...');
    sinon.stub(userService, 'createUser').throws(testError);
    
    await userController.createUser(mockRequest, mockResponse, nextSpy);
    expect(nextSpy.calledOnce).true;
    expect(nextSpy.calledWith(testError)).true;
    expect(statusSpy.notCalled).true;
    expect(jsonSpy.notCalled).true;
  });
});

