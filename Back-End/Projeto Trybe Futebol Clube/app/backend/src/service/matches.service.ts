import matchesModel from '../model/matches.model';
import teamsModel from '../model/teams.model';
import Matches from '../database/models/Matches';
import matchProperties from '../interfaces/matchProperties';

async function searchAllMatches(): Promise<Matches[]> {
  const matches = await matchesModel.selectAllMatches();
  return matches;
}

async function filterTeamedMatches(filters: matchProperties): Promise<Matches[]> {
  const matches = await matchesModel.filterTeamedMatches(filters);

  if (!matches) {
    throw Error(JSON.stringify({ type: 'matchNotFound', message: 'Match not found' }));
  }

  return matches;
}

async function createNewMatch(newMatch: matchProperties): Promise<Matches> {
  if (newMatch.homeTeam === newMatch.awayTeam) {
    throw Error(JSON.stringify({ type: 'sameTeams',
      message: 'It is not possible to create a match with two equal teams' }));
  }
  // Checking if both teams exist, model will throw 404 if not.
  await teamsModel.selectTeamById(newMatch.homeTeam);
  await teamsModel.selectTeamById(newMatch.awayTeam);

  const registeredMatch = await matchesModel.insertMatch(newMatch);
  return registeredMatch;
}

async function finishMatch(id:number): Promise<boolean> {
  const matchFinished = Boolean(await matchesModel.setInProgressFalse(id));
  if (matchFinished) return matchFinished;
  throw Error(JSON.stringify({ type: 'matchAlreadyDone',
    message: 'Invalid Id, match is already finished or does not exist' }));
}

async function setMatchScore(id: number, newScore: matchProperties): Promise<boolean> {
  const scoreUpdated = Boolean(await matchesModel.updateMatchScore(id, newScore));
  if (scoreUpdated) return scoreUpdated;
  throw Error(JSON.stringify({ type: 'idConflict',
    message: 'Invalid Id, match does not exist or score is already equal to sent value' }));
}

export default {
  searchAllMatches,
  filterTeamedMatches,
  createNewMatch,
  finishMatch,
  setMatchScore,
};
