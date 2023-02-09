import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import { validCar } from '../../utils/CarsMock';

const newCar: ICar = validCar;
const car: Car = new Car(newCar);
car.model;
car.year;
car.color;
car.buyValue;
