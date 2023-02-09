import Car from '../../../src/Domains/Car';
import { validCar, validCarWithStatus } from '../../utils/CarsMock';
import ICar from '../../../src/Interfaces/ICar';

const newCar: ICar = validCar;
const car: Car = new Car(newCar);

const newCarWithStatus: ICar = validCarWithStatus;
const carWithStatus: Car = new Car(newCarWithStatus);
