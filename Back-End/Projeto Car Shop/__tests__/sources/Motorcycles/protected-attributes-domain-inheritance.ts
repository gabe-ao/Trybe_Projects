import Motorcycle from '../../../src/Domains/Motorcycle';

class subMotorcycleTest extends Motorcycle {
  public getModel() {
    return this.model;
  }
  public getYear() {
    return this.year;
  }
  public getColor() {
    return this.color;
  }
  public getBuyValue() {
    return this.buyValue;
  }
  public getId() {
    return this.id;
  }
}