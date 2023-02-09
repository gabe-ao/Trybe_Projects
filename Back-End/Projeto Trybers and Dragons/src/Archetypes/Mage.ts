import { EnergyType } from '../Energy';
import Archetype from './Archetype';

class Mage extends Archetype {
  private _energyType: EnergyType;
  private static _instances = 0;

  constructor(name: string) {
    super(name);
    this._energyType = 'mana';
    Mage._instances += 1;
  }

  static createdArchetypeInstances(): number {
    return this._instances;
  }

  public get energyType(): EnergyType {
    return this._energyType;
  }
}

export default Mage;
