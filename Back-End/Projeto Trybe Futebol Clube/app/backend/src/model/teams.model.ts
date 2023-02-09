import Teams from '../database/models/Teams';

async function selectAllTeams(): Promise<Teams[]> {
  const teams = await Teams.findAll();

  if (!teams) {
    throw Error(JSON.stringify({ type: 'voidTeams',
      message: 'No teams have been registered yet' }));
  }
  return teams;
}

async function selectTeamById(id: number): Promise<Teams> {
  const team = await Teams.findOne({
    where: { id },
  });

  if (!team) {
    throw Error(JSON.stringify({ type: 'teamNotFound',
      message: 'There is no team with such id!' }));
  }
  return team;
}

export default {
  selectAllTeams,
  selectTeamById,
};
