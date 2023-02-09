import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import { validCar } from '../../utils/CarsMock';

const newCar: ICar = validCar;
const car: Car = new Car(newCar);
car.doorsQty;
car.seatsQty;
