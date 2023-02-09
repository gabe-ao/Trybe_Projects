import Teams from '../database/models/Teams';
import teamsModel from '../model/teams.model';

async function getAllTeams(): Promise<Teams[]> {
  const teams = await teamsModel.selectAllTeams();
  return teams;
}

async function getTeam(id: number): Promise<Teams> {
  const team = await teamsModel.selectTeamById(id);
  return team;
}

export default {
  getAllTeams,
  getTeam,
};
