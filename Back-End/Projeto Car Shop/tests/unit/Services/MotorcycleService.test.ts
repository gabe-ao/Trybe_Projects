import { expect } from 'chai';
import sinon from 'sinon';

import { Model, Query } from 'mongoose';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { validMotorcycleReq, registeredMotorcycle, validMotorcycle,
  validMotorcycleId, motorcycleList,
  updateMotorcycleReq, updatedMotorcycle } from '../Mocks/motorServiceMocks';

describe('Avaliando camada MotorcycleService: ', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Registra um novo Motorcycle corretamente?', async function () {  
    sinon.stub(Model, 'create').resolves(registeredMotorcycle);
    const service = new MotorcycleService();
    const result = await service.register(validMotorcycleReq);

    expect(result).deep.equal(validMotorcycle);
  });

  it('Se registrar um objeto diferente de IMotorcycle retorna null?', async function () {  
    sinon.stub(Model, 'create').resolves(undefined);
    const service = new MotorcycleService();
    const result = await service.register(validMotorcycleReq);

    expect(result).equal(null);
  });

  it('Busca por todos os Motorcycles corretamente?', async function () {
    sinon.stub(Model, 'find').resolves(motorcycleList);
    const service = new MotorcycleService();
    const result = await service.findAll();
    
    expect(result).deep.equal(motorcycleList);
  });

  it('Busca Motorcycle por id corretamente?', async function () {
    sinon.stub(Model, 'findById').resolves(registeredMotorcycle);
    const service = new MotorcycleService();
    const result = await service.findById(validMotorcycleId);
    
    expect(result).deep.equal(validMotorcycle);
  });

  it('Falha ao buscar por id invalida?', async function () {
    sinon.stub(Model, 'findById').resolves(registeredMotorcycle);
    const service = new MotorcycleService();
    
    try {
      await service.findById('16I74nva7li9da6');
    } catch (error) {
      const contract = JSON.parse((error as Error).message);
      const { message, type } = contract;
      expect(message).equal('Invalid mongo id');
      expect(type).equal('InvalidMongoId');
    }
  });

  it('Faz update de Motorcycle por id?', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').returns(new Query());
    sinon.stub(Query.prototype, 'select').resolves(updateMotorcycleReq);

    const service = new MotorcycleService();
    const result = await service.update(validMotorcycleId, updateMotorcycleReq);
    expect(result).deep.equal(updatedMotorcycle);
  });

  it('Lança erro quando tenta udpate com id invalida?', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').returns(new Query());
    sinon.stub(Query.prototype, 'select').resolves(updateMotorcycleReq);

    const service = new MotorcycleService();
    try {
      await service.update('16I74nva7li9da6', updateMotorcycleReq);
    } catch (error) {
      const contract = JSON.parse((error as Error).message);
      const { message, type } = contract;
      expect(message).equal('Invalid mongo id');
      expect(type).equal('InvalidMongoId');
    }
  });
});
