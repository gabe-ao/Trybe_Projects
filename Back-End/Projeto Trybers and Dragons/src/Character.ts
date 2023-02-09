import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

class Character implements Fighter {
  readonly race: Race;
  readonly archetype: Archetype;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _energy: Energy;
  private _name: string;
  private _dexterity: number;
  private _maxLifePoints: number;
  readonly maxLifeLimit: number;

  constructor(name: string) {
    this._name = name;
    this._dexterity = getRandomInt(1, 10);
    this.race = new Elf(name, this._dexterity);
    this.archetype = new Mage(name);
    this.maxLifeLimit = this.race.maxLifePoints;
    this._maxLifePoints = this.maxLifeLimit / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = { 
      type_: this.archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  get lifePoints(): number { return this._lifePoints; }
  get strength(): number { return this._strength; }
  get defense(): number { return this._defense; }
  get dexterity(): number { return this._dexterity; }
  get energy(): Energy {
    const energyDecoupled = JSON.stringify(this._energy);
    return JSON.parse(energyDecoupled);
  }

  public receiveDamage(attackPoints: number): number {
    const damage = attackPoints - this._defense;
    if (damage <= 0) return this._lifePoints;
    this._lifePoints -= damage;
    if (this._lifePoints <= 0) this._lifePoints = -1;
    return this._lifePoints;
  }

  public attack(enemy: SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }

  public levelUp(): void {
    if (this._maxLifePoints < this.maxLifeLimit) {
      this._maxLifePoints += getRandomInt(1, 10);
    }
    if (this._maxLifePoints > this.maxLifeLimit) {
      this._maxLifePoints = this.maxLifeLimit;
    }

    this._strength += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._energy.amount = 10;
    this._lifePoints = this._maxLifePoints;
  }

  public special(enemy: SimpleFighter): void {
    const higherAttribute = Math
      .max(this._strength, this._defense, this._dexterity);
    enemy.receiveDamage(higherAttribute * 2);
  }
}

export default Character;
