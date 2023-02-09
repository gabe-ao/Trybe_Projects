import { Op, WhereOptions } from 'sequelize';
import teamsModel from '../model/teams.model';
import matchesModel from '../model/matches.model';
import TeamPerformance from '../classes/TeamPerformance';
import PerformanceReport from '../interfaces/PerformanceReport';

async function calcTeamPerformance(id: number, name: string, venue?: 'home' | 'away'):
Promise<PerformanceReport> {
  let filter: WhereOptions = {};
  if (venue) {
    filter = { inProgress: false };
    filter[`${venue}Team`] = id;
  } else {
    filter = { inProgress: false, [Op.or]: [{ homeTeam: id }, { awayTeam: id }] };
  }

  const teamMatches = await matchesModel.filterMatches(filter);
  const teamPerformance = new TeamPerformance(id, name);
  if (!teamMatches) return teamPerformance.report();
  teamMatches.forEach((match) => teamPerformance.addMatch(match));
  return teamPerformance.report();
}

function comparePerformance(reportA: PerformanceReport, reportB: PerformanceReport): number {
  const pointsDiff = reportB.totalPoints - reportA.totalPoints;
  if (pointsDiff !== 0) return pointsDiff;

  const victoriesDiff = reportB.totalVictories - reportA.totalVictories;
  if (victoriesDiff !== 0) return victoriesDiff;

  const balanceDiff = reportB.goalsBalance - reportA.goalsBalance;
  if (balanceDiff !== 0) return balanceDiff;

  const goalsFavorDiff = reportB.goalsFavor - reportA.goalsFavor;
  if (goalsFavorDiff !== 0) return goalsFavorDiff;

  const goalsOwnDiff = reportB.goalsOwn - reportA.goalsOwn;
  if (goalsOwnDiff !== 0) return goalsOwnDiff;

  return 0;
}

async function createLeaderboard(venue?: 'home' | 'away'): Promise<PerformanceReport[]> {
  const teamsList = await teamsModel.selectAllTeams();
  const leaderboard = await Promise.all(teamsList.map(async (team) => {
    const report = await calcTeamPerformance(team.id, team.teamName, venue);
    return report;
  }));
  leaderboard.sort(comparePerformance);
  return leaderboard;
}

export default {
  createLeaderboard,
  calcTeamPerformance,
  comparePerformance,
};
