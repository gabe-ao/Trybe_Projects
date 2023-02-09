import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import CarODM from '../Models/CarODM';
import ICar from '../Interfaces/ICar';
import AbstractService from './AbstractService';

class CarService extends AbstractService<Car, ICar> {
  protected createDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async register(car: ICar): Promise<Car | null> {
    const carODM = new CarODM();
    const carDocument = await carODM.create(car);
    const registeredCar = this.createDomain(carDocument);
    return registeredCar;
  }

  public async findAll(): Promise<ICar[]> {
    const carODM = new CarODM();
    const allCars = await carODM.findAll();
    return allCars;
  }

  public async findById(id: string): Promise<Car | null> {
    if (!isValidObjectId(id)) {
      throw Error(JSON.stringify({ type: 'InvalidMongoId', message: 'Invalid mongo id' }));
    }

    const carODM = new CarODM();
    const carDocument = await carODM.findById(id);
    const car = this.createDomain(carDocument);
    return car;
  }

  public async update(id: string, car: ICar): Promise<Car | null> {
    if (!isValidObjectId(id)) {
      throw Error(JSON.stringify({ type: 'InvalidMongoId', message: 'Invalid mongo id' }));
    }
    const carODM = new CarODM();
    const carDocument = await carODM.updateOneById(id, car);
    const updatedCar = this.createDomain(carDocument);
    return updatedCar;
  }
}

export default CarService;