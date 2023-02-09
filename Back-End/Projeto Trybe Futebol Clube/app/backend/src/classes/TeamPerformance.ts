import Matches from '../database/models/Matches';
import PerformanceReport from '../interfaces/PerformanceReport';

class TeamPerformance {
  public name: string;
  protected _id: number;
  protected _totalGames = 0;
  protected _totalVictories = 0;
  protected _totalDraws = 0;
  protected _totalLosses = 0;
  protected _goalsFavor = 0;
  protected _goalsOwn = 0;
  protected _goalsBalance = 0;
  protected _totalPoints = 0;
  protected _efficiency = 0;

  constructor(id: number, name: string) {
    this._id = id;
    this.name = name;
  }

  public get id(): number {
    return this._id;
  }

  public get totalGames(): number {
    return this._totalGames;
  }

  public get totalVictories(): number {
    return this._totalVictories;
  }

  public get totalDraws(): number {
    return this._totalDraws;
  }

  public get totalLosses(): number {
    return this._totalLosses;
  }

  public get goalsFavor(): number {
    return this._goalsFavor;
  }

  public get goalsOwn(): number {
    return this._goalsOwn;
  }

  public get goalsBalance(): number {
    return this._goalsBalance;
  }

  public get totalPoints(): number {
    return this._totalPoints;
  }

  public get efficiency(): number {
    return this._efficiency;
  }

  public addMatch(match: Matches): void {
    const { homeTeam, homeTeamGoals, awayTeamGoals } = match;
    const goalsInFavor = (this._id === homeTeam) ? homeTeamGoals : awayTeamGoals;
    const goalsAgainst = (this._id === homeTeam) ? awayTeamGoals : homeTeamGoals;

    this._totalGames += 1;
    this._goalsFavor += goalsInFavor;
    this._goalsOwn += goalsAgainst;
    this._totalVictories += (goalsInFavor > goalsAgainst) ? 1 : 0;
    this._totalDraws += (goalsInFavor === goalsAgainst) ? 1 : 0;
    this._totalLosses += (goalsInFavor < goalsAgainst) ? 1 : 0;
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
    this._totalPoints = 3 * this._totalVictories + this._totalDraws;
    this._efficiency = Number.parseFloat(
      ((this._totalPoints / (this._totalGames * 3)) * 100).toFixed(2),
    );
  }

  public report(): PerformanceReport {
    const report: PerformanceReport = {
      name: this.name,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance: this._goalsBalance,
      efficiency: this._efficiency,
    };
    return report;
  }
}

export default TeamPerformance;
