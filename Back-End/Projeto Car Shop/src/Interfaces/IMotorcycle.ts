import IVehicle from './IVehicle';

interface IMotorcycle extends IVehicle {
  category: 'Street' | 'Custom' | 'Trail',
  engineCapacity: number,
}

export default IMotorcycle;