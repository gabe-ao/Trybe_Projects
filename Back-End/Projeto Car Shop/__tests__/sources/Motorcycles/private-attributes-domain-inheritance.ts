import Motorcycle from '../../../src/Domains/Motorcycle';

class subMotorcycleTest extends Motorcycle {
  public getCategory() {
    return this.category;
  }
  public getEngineCapacity() {
    return this.engineCapacity;
  }
}