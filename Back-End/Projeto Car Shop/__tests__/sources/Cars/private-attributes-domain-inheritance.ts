import Car from '../../../src/Domains/Car';

class subCarTest extends Car {
  public getDoorsQty() {
    return this.doorsQty;
  }
  public getSeatsQty() {
    return this.seatsQty;
  }
}