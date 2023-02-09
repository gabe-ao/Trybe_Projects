import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';
import { validLoginReq, userLoginData, userTokenFixedPart,
  invalidLoginReqs, userData, mockToken } from './mocks/usersMocks';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Avaliando rota POST /login', () => {
  let chaiHttpResponse: Response;
  /* In order to isolate the app for testing, this beforeEach will mock the database's response */
  beforeEach(() => {
    sinon.stub(Users, 'findOne').resolves(userLoginData as Users);
  });

  /* This afterEach will guarantee that target stubs mocks are restored after each test is done */
  afterEach(() => {
    (Users.findOne as sinon.SinonStub).restore();
  });

  it('Login válido recebido, aceito e token retornado', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(validLoginReq);
    const { status, body, body: { token } } = chaiHttpResponse;

    expect(status).to.be.equal(200)
    expect(body).to.haveOwnProperty('token');
    expect(token).to.includes(userTokenFixedPart);
  });

  it('Erro retornado devido falta de dados no request do Login', async () => {
    const { emptyEmail, emptyPass } = invalidLoginReqs;
    for(const badReq of [emptyEmail, emptyPass]) {
      chaiHttpResponse = await chai.request(app).post('/login').send(badReq);
      const { status, body: { message } } = chaiHttpResponse;

      expect(status).to.be.equal(400);
      expect(message).to.be.equal('All fields must be filled');
    }
  });

  it('Erro retornado porque os dados de login estao incorretos', async () => {
    const { invalidEmail, invalidPass} = invalidLoginReqs;
    for (const badReq of [invalidEmail, invalidPass]) {
      chaiHttpResponse = await chai.request(app).post('/login').send(badReq);
      const { status, body: { message } } = chaiHttpResponse;

      expect(status).to.be.equal(401);
      expect(message).to.be.equal('Incorrect email or password');
    }
  });

  it('Erro retornado por password inexistente no banco de dados', async () => {
    const wrongPassword = { email: validLoginReq.email, password: 'wont be found' };
    chaiHttpResponse = await chai.request(app).post('/login').send(wrongPassword);
    const { status, body: { message } } = chaiHttpResponse;

    expect(status).to.be.equal(401);
    expect(message).to.be.equal('Incorrect email or password');
  });

 it('Erro retornado por usuario inexistente no banco de dados', async () => {
    (Users.findOne as sinon.SinonStub).restore();
    sinon.stub(Users, 'findOne').resolves(null);
    chaiHttpResponse = await chai.request(app).post('/login').send(validLoginReq);
    const { status, body: { message } } = chaiHttpResponse;

    expect(status).to.be.equal(401);
    expect(message).to.be.equal('Incorrect email or password');
  });
});

describe('Avaliando rota GET /login/validate', () => {
  let chaiHttpResponse: Response;
  beforeEach(() => {
    sinon.stub(Users, 'findOne').resolves(userData as Users);
  });

  afterEach(() => {
    (Users.findOne as sinon.SinonStub).restore();
  });

  it('Validando token com sucesso e obtendo role do user', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate')
      .set('Authorization', mockToken);
    const { status, body, body: { role } } = chaiHttpResponse;

    expect(status).to.be.equal(200);
    expect(body).to.haveOwnProperty('role');
    expect(role).to.be.equal('user');
  });

  it('Retorna erro porque a id de usuário é inexistente no banco de dados', async () => {
    (Users.findOne as sinon.SinonStub).restore();
    sinon.stub(Users, 'findOne').resolves(null);

    chaiHttpResponse = await chai.request(app).get('/login/validate')
      .set('Authorization', mockToken);
    const { status, body: { message } } = chaiHttpResponse;

    expect(status).to.be.equal(401);
    expect(message).to.be.equal('Unauthorized access');
  });

  it('Retorna erro devido o token ser invalido', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate')
      .set('Authorization', 'token invalido');
    const { status, body: { message } } = chaiHttpResponse;

    expect(status).to.be.equal(401);
    expect(message).to.be.equal('Invalid token');
  });

  it('Retorna erro porque token não foi enviado', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/validate')
      .set('Authorization', '');
    const { status, body: { message } } = chaiHttpResponse;

    expect(status).to.be.equal(400);
    expect(message).to.be.equal('Token is required');
  });
});

describe('Avaliando o controller de erros', () => {
  it('Retorna a resposta adequada ao um erro interno inesperado', async () => {  
    sinon.stub(Users, 'findOne').throws();
    sinon.stub(console, 'log').resolves();
    const chaiHttpResponse = await chai.request(app).get('/login/validate')
      .set('Authorization', mockToken);
    const { status, text } = chaiHttpResponse;

    expect(status).to.be.equal(500);
    expect(text).to.be.equal('Internal Server Error');
    sinon.restore();
  });
});
