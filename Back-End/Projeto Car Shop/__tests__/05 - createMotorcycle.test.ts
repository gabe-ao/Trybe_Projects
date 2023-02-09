import request from 'supertest';
import app from '../src/app';
import Connection from '../src/Models/Connection';
import { clearDatabase, closeDatabase } from './utils/db';
import { validMotorcycle } from './utils/MotorcyclesMock';

describe('05 - Crie a rota /motorcycles onde seja possível cadastrar uma moto', () => {

  beforeEach(() => console.info(expect.getState().currentTestName, 'testando...\n\n' ));

  it('Será validado que existe uma interface de nome IMotorcycle que representa o contrato usado para cadastrar uma moto', () => {
    expect('Motorcycles/exists-interface').toCompile();
  });

  it('Será validado que a interface contém os atributos especificados na tabela', () => {
    expect('Motorcycles/correct-interface').toCompile();
  });

  it('Será validado que existe uma interface de nome IVehicle e esta contém os atributos repetidos de carro e moto', () => {
    expect('Vehicle/exists-interface').toCompile();
    expect('Vehicle/correct-interface').toCompile();
    expect('Vehicle/correct-interface-with-status').toCompile();
    expect('Vehicle/incorrect-interface-with-car-attributes').notToCompile();
    expect('Vehicle/incorrect-interface-with-motorcycle-attributes').notToCompile();
  });

  it('Será validado que existe uma classe de domínio com o nome Motorcycle que representa o objeto moto', () => {
    expect('Motorcycles/exists-domain').toCompile();
  });

  it('Será validado que a classe de domínio moto contém os atributos: category e engineCapacity acessíveis apenas a própria classe', () => {
    expect('Motorcycles/exists-domain').toCompile();
    expect('Motorcycles/private-attributes-domain-instance').notToCompile();
    expect('Motorcycles/private-attributes-domain-inheritance').notToCompile();
  });

  it('Será validado que a classe de domínio moto contém os atributos restantes acessíveis a própria classe e suas subclasses', () => {
    expect('Motorcycles/exists-domain').toCompile();
    expect('Motorcycles/protected-attributes-domain-instance').notToCompile();
    expect('Motorcycles/protected-attributes-domain-inheritance').toCompile();
  });

  it('Será validado que a instância da classe de domínio moto recebe como parâmetro um objeto do tipo IMotorcycle', () => {
    expect('Motorcycles/correct-instance').toCompile();
  });

  it('Será validado que existe uma classe de domínio com o nome Vehicle e esta contém os atributos repetidos de carro e moto', () => {
    expect('Vehicle/exists-domain').toCompile();
  });

  it('Será validado que a classe de domínio veiculo contém os atributos acessíveis a própria classe e suas subclasses', () => {
    expect('Vehicle/exists-domain').toCompile();
    expect('Vehicle/protected-attributes-domain-instance').notToCompile();
    expect('Vehicle/protected-attributes-domain-inheritance').toCompile();
  });

  it('Será validado que existe uma classe de nome AbstractODM que representa o modelo de comunicação com o banco e ela serve como abstração para as demais', () => {
    expect('Models/exists-model').toCompile();
    expect('Models/correct-inheritance').toCompile();
  });

  it('Será validado que é possível cadastrar uma moto com sucesso', async () => {
    await Connection();
    await clearDatabase();

    const { body, statusCode } = await request(app).post('/motorcycles').send(validMotorcycle);
    expect(statusCode).toEqual(201);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('model');
    expect(body).toHaveProperty('year');
    expect(body).toHaveProperty('color');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual(false);
    expect(body).toHaveProperty('buyValue');
    expect(body).toHaveProperty('category');
    expect(body).toHaveProperty('engineCapacity');
  });

  afterAll(async () => await closeDatabase());
});
