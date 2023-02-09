import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';

const validMotorcycleReq: IMotorcycle = {
  model: 'Yamaha Factor 125i',
  year: 2007,
  color: 'Green',
  status: true,
  buyValue: 15.000,
  category: 'Street',
  engineCapacity: 800,
};

const registeredMotorcycle: IMotorcycle = {
  id: '634852326b35b59438fbea2f',
  model: 'Yamaha Factor 125i',
  year: 2007,
  color: 'Green',
  status: true,
  buyValue: 15.000,
  category: 'Street',
  engineCapacity: 800,
};

const validMotorcycleId = '634852326b35b59438fbea2f';
const validMotorcycle = new Motorcycle(registeredMotorcycle);

const updateMotorcycleReq: IMotorcycle = {
  id: '634852326b35b59438fbea2f',
  model: '',
  year: 0,
  color: '',
  status: false,
  buyValue: 0,
  category: 'Custom',
  engineCapacity: 0,
};

const updatedMotorcycle = new Motorcycle(updateMotorcycleReq);

const motorcycleList: IMotorcycle[] = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Honda Cbr 1000rr',
    year: 2011,
    color: 'Orange',
    status: true,
    buyValue: 59.900,
    category: 'Street',
    engineCapacity: 1000,
  },
];

export {
  validMotorcycleReq,
  registeredMotorcycle,
  validMotorcycle,
  validMotorcycleId,
  motorcycleList,
  updateMotorcycleReq,
  updatedMotorcycle,
};