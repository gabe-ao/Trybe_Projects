import request from 'supertest';
import { model, Schema } from 'mongoose';
import app from '../src/app';
import Connection from '../src/Models/Connection';
import { clearDatabase, closeDatabase } from './utils/db';
import { motorcyclesArray } from './utils/MotorcyclesMock';

describe('07 - Crie a rota /motorcycles onde seja possível listar motos', () => {

  let VALID_ID: string;

  beforeAll(async () => {
    await Connection();
    await clearDatabase();
    const schema = new Schema({ }, { strict: false, collection: 'motorcycles' });
    const Motorcycle = model('MotorcycleTest', schema);
    let motorcycle = new Motorcycle(motorcyclesArray[0]);
    await motorcycle.save();
    motorcycle = new Motorcycle(motorcyclesArray[1]);
    const { _id } = await motorcycle.save();
    VALID_ID = _id;
  });

  afterAll(async () => await closeDatabase());

  it('Será validado que é possível listar todas as motos', async () => {
    const { body, statusCode } = await request(app).get('/motorcycles');
    expect(statusCode).toEqual(200);
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('model');
    expect(body[0].model).toEqual('Honda Cb 600f Hornet');
    expect(body[0]).toHaveProperty('year');
    expect(body[0].year).toEqual(2005);
    expect(body[0]).toHaveProperty('color');
    expect(body[0].color).toEqual('Yellow');
    expect(body[0]).toHaveProperty('status');
    expect(body[0].status).toEqual(true);
    expect(body[0]).toHaveProperty('buyValue');
    expect(body[0].buyValue).toEqual(30.000);
    expect(body[0]).toHaveProperty('category');
    expect(body[0].category).toEqual('Street');
    expect(body[0]).toHaveProperty('engineCapacity');
    expect(body[0].engineCapacity).toEqual(600);

    expect(body[1]).toHaveProperty('id');
    expect(body[1]).toHaveProperty('model');
    expect(body[1].model).toEqual('Honda Cbr 1000rr');
    expect(body[1]).toHaveProperty('year');
    expect(body[1].year).toEqual(2011);
    expect(body[1]).toHaveProperty('color');
    expect(body[1].color).toEqual('Orange');
    expect(body[1]).toHaveProperty('buyValue');
    expect(body[1].buyValue).toEqual(59.900);
    expect(body[1]).toHaveProperty('category');
    expect(body[1].category).toEqual('Street');
    expect(body[1]).toHaveProperty('engineCapacity');
    expect(body[1].engineCapacity).toEqual(1000);
  });

  it('Será validado que não é possível listar uma moto que não existe', async () => {
    const { body, statusCode } = await request(app).get('/motorcycles/1111222233330000ffffcccc');

    expect(statusCode).toEqual(404);
    expect(body.message).toEqual('Motorcycle not found');
  });

  it('Será validado que não é possível listar uma moto quando o formato do id esta inválido', async () => {
    const { body, statusCode } = await request(app).get('/motorcycles/INVALID_MONGO_ID');

    expect(statusCode).toEqual(422);
    expect(body.message).toEqual('Invalid mongo id');
  });

  it('Será validado que é possível listar uma moto específica com sucesso', async () => {
    const { body, statusCode } = await request(app).get(`/motorcycles/${VALID_ID}`);
    expect(statusCode).toEqual(200);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('model');
    expect(body.model).toEqual('Honda Cbr 1000rr');
    expect(body).toHaveProperty('year');
    expect(body.year).toEqual(2011);
    expect(body).toHaveProperty('color');
    expect(body.color).toEqual('Orange');
    expect(body).toHaveProperty('buyValue');
    expect(body.buyValue).toEqual(59.900);
    expect(body).toHaveProperty('category');
    expect(body.category).toEqual('Street');
    expect(body).toHaveProperty('engineCapacity');
    expect(body.engineCapacity).toEqual(1000);
  });
});
