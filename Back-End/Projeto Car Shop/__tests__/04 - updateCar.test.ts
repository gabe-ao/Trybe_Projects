import request from 'supertest';
import { model, Schema } from 'mongoose';
import app from '../src/app';
import Connection from '../src/Models/Connection';
import { clearDatabase, closeDatabase } from './utils/db';
import { updatedCar, validCar } from './utils/CarsMock';

describe('04 - Crie a rota /cars/:id onde seja possível atualizar um carro por ID', () => {

  let VALID_ID: string;

  beforeAll(async () => {
    await Connection();
    await clearDatabase();
    const schema = new Schema({ }, { strict: false, collection: 'cars' });
    const Car = model('CarTest', schema);
    const car = new Car(validCar);
    const { _id } = await car.save();
    VALID_ID = _id;
  });

  afterAll(async () => await closeDatabase());

  it('Será validado que não é possível alterar um carro que não existe', async () => {
    const {
      body,
      statusCode,
    } = await request(app).put('/cars/1111222233330000ffffcccc').send(updatedCar);

    expect(statusCode).toEqual(404);
    expect(body.message).toEqual('Car not found');
  });

  it('Será validado que não é possível alterar um carro quando o formato do id esta inválido', async () => {
    const {
      body,
      statusCode,
    } = await request(app).put('/cars/INVALID_MONGO_ID').send(updatedCar);

    expect(statusCode).toEqual(422);
    expect(body.message).toEqual('Invalid mongo id');
  });

  it('Será validado que é possível alterar um carro com sucesso', async () => {
    const {
      body,
      statusCode,
    } = await request(app).put(`/cars/${VALID_ID}`).send(updatedCar);
    expect(statusCode).toEqual(200);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('model');
    expect(body.model).toEqual('Uno da Escada');
    expect(body).toHaveProperty('year');
    expect(body.year).toEqual(1979);
    expect(body).toHaveProperty('color');
    expect(body.color).toEqual('Red');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual(true);
    expect(body).toHaveProperty('buyValue');
    expect(body.buyValue).toEqual(3500);
    expect(body).toHaveProperty('doorsQty');
    expect(body.doorsQty).toEqual(2);
    expect(body).toHaveProperty('seatsQty');
    expect(body.seatsQty).toEqual(4);
  });
});
