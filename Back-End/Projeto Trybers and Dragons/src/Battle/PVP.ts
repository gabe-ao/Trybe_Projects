import Character from '../Character';
import Fighter from '../Fighter';
import Battle from './Battle';

class PVP extends Battle {
  protected attackingPlayer: Fighter;
  protected defendingPlayer: Fighter;

  constructor(
    attackingPlayer: Fighter = new Character('attackingPlayer'),
    defendingPlayer: Fighter = new Character('defendingPlayer'),
  ) {
    super(attackingPlayer);
    this.attackingPlayer = attackingPlayer;
    this.defendingPlayer = defendingPlayer;
  }

  fight(): number {
    while (this.attackingPlayer.lifePoints !== -1) {
      this.attackingPlayer.attack(this.defendingPlayer);
      if (this.defendingPlayer.lifePoints === -1) return 1;
      this.defendingPlayer.attack(this.attackingPlayer);
    }
    return -1;
  }
}

export default PVP;
