import Vehicle from '../../../src/Domains/Vehicle';
import IVehicle from '../../../src/Interfaces/IVehicle';
import { validVehicle } from '../../utils/vehicleMock';

const newMotorcycle: IVehicle = validVehicle;
const vehicle: Vehicle = new Vehicle(newMotorcycle);
vehicle.model;
vehicle.year;
vehicle.color;
vehicle.buyValue;
