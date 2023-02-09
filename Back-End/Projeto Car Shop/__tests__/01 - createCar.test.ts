import request from 'supertest';
import app from '../src/app';
import Connection from '../src/Models/Connection';
import { clearDatabase, closeDatabase } from './utils/db';
import { validCar } from './utils/CarsMock';

describe('01 - Crie a rota /cars onde seja possível cadastrar um carro', () => {

  beforeEach(() => console.info(expect.getState().currentTestName, 'testando...\n\n' ));

  it('Será validado que existe uma interface de nome ICar que representa o contrato usado para cadastrar um carro', () => {
    expect('Cars/exists-interface').toCompile();
  });

  it('Será validado que a interface contém os atributos especificados na tabela', () => {
    expect('Cars/correct-interface').toCompile();
    expect('Cars/correct-interface-with-status').toCompile();
  });

  it('Será validado que existe uma classe de domínio com o nome Car que representa o objeto carro', () => {
    expect('Cars/exists-domain').toCompile();
  });

  it('Será validado que a classe de domínio carro contém os atributos: doorsQty e seatsQty acessíveis apenas a própria classe', () => {
    expect('Cars/exists-domain').toCompile();
    expect('Cars/private-attributes-domain-instance').notToCompile();
    expect('Cars/private-attributes-domain-inheritance').notToCompile();
  });

  it('Será validado que a classe de domínio carro contém os atributos restantes acessíveis a própria classe e suas subclasses', () => {
    expect('Cars/exists-domain').toCompile();
    expect('Cars/protected-attributes-domain-instance').notToCompile();
    expect('Cars/protected-attributes-domain-inheritance').toCompile();
  });

  it('Será validado que a instância da classe de domínio carro recebe como parâmetro um objeto do tipo ICar', () => {
    expect('Cars/correct-instance').toCompile();
  });

  it('Será validado que é possível cadastrar um carro com sucesso', async () => {
    await Connection();
    await clearDatabase();

    const { body, statusCode } = await request(app).post('/cars').send(validCar);
    expect(statusCode).toEqual(201);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('model');
    expect(body).toHaveProperty('year');
    expect(body).toHaveProperty('color');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual(false);
    expect(body).toHaveProperty('buyValue');
    expect(body).toHaveProperty('doorsQty');
    expect(body).toHaveProperty('seatsQty');
  });

  afterAll(async () => await closeDatabase());
});
