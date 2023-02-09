import request from 'supertest';
import { model, Schema } from 'mongoose';
import app from '../src/app';
import Connection from '../src/Models/Connection';
import { clearDatabase, closeDatabase } from './utils/db';
import { updatedMotorcycle, validMotorcycle } from './utils/MotorcyclesMock';

describe('08 - Crie a rota /motorcycles/:id onde seja possível atualizar uma moto por ID', () => {

  let VALID_ID: string;

  beforeAll(async () => {
    await Connection();
    await clearDatabase();
    const schema = new Schema({ }, { strict: false, collection: 'motorcycles' });
    const Motorcycle = model('MotorcycleTest', schema);
    const motorcycle = new Motorcycle(validMotorcycle);
    const { _id } = await motorcycle.save();
    VALID_ID = _id;
  });

  afterAll(async () => await closeDatabase());

  it('Será validado que não é possível alterar uma moto que não existe', async () => {
    const {
      body,
      statusCode,
    } = await request(app).put('/motorcycles/1111222233330000ffffcccc').send(updatedMotorcycle);

    expect(statusCode).toEqual(404);
    expect(body.message).toEqual('Motorcycle not found');
  });

  it('Será validado que não é possível alterar uma moto quando o formato do id esta inválido', async () => {
    const {
      body,
      statusCode,
    } = await request(app).put('/motorcycles/INVALID_MONGO_ID').send(updatedMotorcycle);

    expect(statusCode).toEqual(422);
    expect(body.message).toEqual('Invalid mongo id');
  });

  it('Será validado que é possível alterar uma moto com sucesso', async () => {
    const {
      body,
      statusCode,
    } = await request(app).put(`/motorcycles/${VALID_ID}`).send(updatedMotorcycle);
    expect(statusCode).toEqual(200);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('model');
    expect(body.model).toEqual('Honda CG Titan 150');
    expect(body).toHaveProperty('year');
    expect(body.year).toEqual(2020);
    expect(body).toHaveProperty('color');
    expect(body.color).toEqual('Black');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual(true);
    expect(body).toHaveProperty('buyValue');
    expect(body.buyValue).toEqual(8.200);
    expect(body).toHaveProperty('category');
    expect(body.category).toEqual('Street');
    expect(body).toHaveProperty('engineCapacity');
    expect(body.engineCapacity).toEqual(150);
  });
});
