import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import { validMotorcycle, validMotorcycleWithStatus } from '../../utils/MotorcyclesMock';

const newMotorcycle: IMotorcycle = validMotorcycle;
const motorcycle: Motorcycle = new Motorcycle(newMotorcycle);

const newMotorcycleWithStatus: IMotorcycle = validMotorcycleWithStatus;
const motorcycleWithStatus: Motorcycle = new Motorcycle(newMotorcycleWithStatus);
