import Vehicle from '../../../src/Domains/Vehicle';

class subVehicleTest extends Vehicle {
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