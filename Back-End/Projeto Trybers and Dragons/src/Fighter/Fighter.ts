import Energy from '../Energy';
import SimpleFighter from './SimpleFighter';

interface Fighter extends SimpleFighter {
  defense: number,
  energy?: Energy,
  levelUp(): void,
  special?(enemy: Fighter): void,
}

export default Fighter;
