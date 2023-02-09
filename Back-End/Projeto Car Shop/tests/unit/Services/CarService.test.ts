import { expect } from 'chai';
import sinon from 'sinon';

import { Model, Query } from 'mongoose';
import CarService from '../../../src/Services/CarService';
import { validCarReq, registeredCar, validCar,
  validCarId, carList, updateCarReq, updatedCar } from '../Mocks/carServiceMocks';

describe('Avaliando camada CarService: ', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Registra um novo Car corretamente?', async function () {  
    sinon.stub(Model, 'create').resolves(registeredCar);
    const service = new CarService();
    const result = await service.register(validCarReq);

    expect(result).deep.equal(validCar);
  });

  it('Se registrar um objeto diferente de ICar retorna null?', async function () {  
    sinon.stub(Model, 'create').resolves(undefined);
    const service = new CarService();
    const result = await service.register(validCarReq);

    expect(result).equal(null);
  });

  it('Busca por todos os Cars corretamente?', async function () {
    sinon.stub(Model, 'find').resolves(carList);
    const service = new CarService();
    const result = await service.findAll();
    
    expect(result).deep.equal(carList);
  });

  it('Busca Car por id corretamente?', async function () {
    sinon.stub(Model, 'findById').resolves(registeredCar);
    const service = new CarService();
    const result = await service.findById(validCarId);
    
    expect(result).deep.equal(validCar);
  });

  it('Falha ao buscar por id invalida?', async function () {
    sinon.stub(Model, 'findById').resolves(registeredCar);
    const service = new CarService();
    
    try {
      await service.findById('16I74nva7li9da6');
    } catch (error) {
      const contract = JSON.parse((error as Error).message);
      const { message, type } = contract;
      expect(message).equal('Invalid mongo id');
      expect(type).equal('InvalidMongoId');
    }
  });

  it('Faz update de Car por id?', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').returns(new Query());
    sinon.stub(Query.prototype, 'select').resolves(updateCarReq);

    const service = new CarService();
    const result = await service.update(validCarId, updateCarReq);
    expect(result).deep.equal(updatedCar);
  });

  it('Lança erro quando tenta udpate com id invalida?', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').returns(new Query());
    sinon.stub(Query.prototype, 'select').resolves(updateCarReq);

    const service = new CarService();
    try {
      await service.update('16I74nva7li9da6', updateCarReq);
    } catch (error) {
      const contract = JSON.parse((error as Error).message);
      const { message, type } = contract;
      expect(message).equal('Invalid mongo id');
      expect(type).equal('InvalidMongoId');
    }
  });
});
