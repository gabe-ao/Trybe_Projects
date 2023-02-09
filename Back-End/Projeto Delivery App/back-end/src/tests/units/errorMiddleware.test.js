const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const app = require('../../api/app');
const userService = require('../../services/userService');

chai.use(chaiHttp);
const { expect, request } = chai;

describe('#### Avalia errorMiddleware ####', () => {
  const reqBody = { email: 'naoexiste@invalido', senha: '1234' };
  afterEach(() => sinon.restore());
  
  it('1 - Responde adequadamente a erros inesperados?', async () => {
    sinon.stub(userService, 'authenticate').throws();
    const chaiHttpResponse = await request(app).post('/login').send(reqBody);

    const { status, body } = chaiHttpResponse;
    expect(status).equal(500);
    expect(body).deep.equal({ message: 'Internal Server Error' });
  });

  it('2 - Responde adequadamente a erros esperados?', async () => {
    const knownError = { status: 404, message: 'Not Found' };
    sinon.stub(userService, 'authenticate').throws(knownError);
    const chaiHttpResponse = await request(app).post('/login').send(reqBody);

    const { status, body } = chaiHttpResponse;
    expect(status).equal(knownError.status);
    expect(body).deep.equal({ message: knownError.message });
  });
});

