import Monster from './Monster';

class Dragon extends Monster {
  constructor() {
    super();
    this._lifePoints = 1337;
    this._strength = 373;
  }
}

export default Dragon;
