import Fighter, { SimpleFighter } from '../Fighter';
import Battle from './Battle';

class PVE extends Battle {
  protected mainPlayer: Fighter;
  protected enemies: (Fighter | SimpleFighter)[];
  private _turnsToKill: number[];

  constructor(
    mainPlayer: Fighter,
    enemies: (Fighter | SimpleFighter)[],
  ) {
    super(mainPlayer);
    this.mainPlayer = mainPlayer;
    this.enemies = enemies;
    this._turnsToKill = this.turnsToKill();
  }

  private turnsToKill(): number[] {
    const turnsToKill = this.enemies.map((enemy) => {
      if ('defense' in enemy) {
        if (enemy.defense === this.mainPlayer.strength) return -1;
        return enemy.lifePoints / (this.mainPlayer.strength - enemy.defense);
      }
      return enemy.lifePoints / this.mainPlayer.strength;
    });
    return turnsToKill;
  }

  private targetOrder(): number[][] {
    const turnsToKillOrdered = this._turnsToKill
      .map((turns, order) => [order, turns])
      .sort((a, b) => a[1] - b[1]);
    return turnsToKillOrdered;
  }

  private enemiesAttack(): void {
    this.enemies.forEach((enemy) => enemy.attack(this.mainPlayer));
  }

  private playerFightTarget(enemyIndex: number, turnsToKill: number): void {
    const target = this.enemies[enemyIndex];
    for (let i = turnsToKill; i > 0; i -= 1) {
      this.mainPlayer.attack(target);
      this.enemiesAttack();
      if (this.mainPlayer.lifePoints < 0) break;
    }
  }

  fight(): number {
    if (Math.min(...this._turnsToKill) < 0) return -1;
    const targetOrder = this.targetOrder();
    targetOrder.some(([enemyIndex, turns]) => {
      this.playerFightTarget(enemyIndex, turns);
      const isPlayerDead = this.mainPlayer.lifePoints <= 0;
      return isPlayerDead;
    });
    if (this.mainPlayer.lifePoints < 0) return -1;
    return 1;
  }
}

export default PVE;
