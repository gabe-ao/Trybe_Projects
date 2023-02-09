import ICar from '../../../src/Interfaces/ICar';
import Car from '../../../src/Domains/Car';

const validCarReq: ICar = {
  model: 'Palio',
  year: 2008,
  color: 'Green',
  buyValue: 28486,
  status: true,
  doorsQty: 2,
  seatsQty: 5,
};

const registeredCar: ICar = {
  id: '63cf023376d4e5fb20b26e4b',
  model: 'Palio',
  year: 2008,
  color: 'Green',
  status: true,
  buyValue: 28486,
  doorsQty: 2,
  seatsQty: 5,
};

const validCarId = '63cf023376d4e5fb20b26e4b';
const validCar = new Car(registeredCar);

const updateCarReq: ICar = {
  id: '63cf023376d4e5fb20b26e4b',
  model: '',
  year: 0,
  color: '',
  status: false,
  buyValue: 0,
  doorsQty: 0,
  seatsQty: 0,
};

const updatedCar = new Car(updateCarReq);

const carList: ICar[] = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Tempra',
    year: 1995,
    color: 'Black',
    buyValue: 39,
    doorsQty: 2,
    seatsQty: 5,
  },
];

export {
  validCarReq,
  registeredCar,
  validCar,
  validCarId,
  carList,
  updateCarReq,
  updatedCar,
};