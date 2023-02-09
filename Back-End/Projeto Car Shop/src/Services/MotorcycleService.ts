import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractService from './AbstractService';

class MotorcycleService extends AbstractService<Motorcycle, IMotorcycle> {
  protected createDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async register(motorcycle: IMotorcycle): Promise<Motorcycle | null> {
    const motorcycleODM = new MotorcycleODM();
    const motorcycleDocument = await motorcycleODM.create(motorcycle);
    const registeredMotorcycle = this.createDomain(motorcycleDocument);
    return registeredMotorcycle;
  }

  public async findAll(): Promise<IMotorcycle[]> {
    const motorcycleODM = new MotorcycleODM();
    const allMotorcycles = await motorcycleODM.findAll();
    return allMotorcycles;
  }

  public async findById(id: string): Promise<Motorcycle | null> {
    if (!isValidObjectId(id)) {
      throw Error(JSON.stringify({ type: 'InvalidMongoId', message: 'Invalid mongo id' }));
    }

    const motorcycleODM = new MotorcycleODM();
    const motorcycleDocument = await motorcycleODM.findById(id);
    const motorcycle = this.createDomain(motorcycleDocument);
    return motorcycle;
  }

  public async update(id: string, motorcycle: IMotorcycle): Promise<Motorcycle | null> {
    if (!isValidObjectId(id)) {
      throw Error(JSON.stringify({ type: 'InvalidMongoId', message: 'Invalid mongo id' }));
    }
    const motorcycleODM = new MotorcycleODM();
    const motorcycleDocument = await motorcycleODM.updateOneById(id, motorcycle);
    const updatedMotorcycle = this.createDomain(motorcycleDocument);
    return updatedMotorcycle;
  }
}

export default MotorcycleService;