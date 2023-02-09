import { WhereOptions } from 'sequelize';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import matchProperties from '../interfaces/matchProperties';

async function selectAllMatches(): Promise<Matches[]> {
  const matches = await Matches.findAll({
    include: [{
      model: Teams,
      as: 'teamHome',
      attributes: ['teamName'],
    },
    {
      model: Teams,
      as: 'teamAway',
      attributes: ['teamName'],
    }],
  });

  if (!matches) {
    throw Error(JSON.stringify({ type: 'voidMatches',
      message: 'No matches have been registered yet' }));
  }
  return matches;
}

async function filterMatches(filters: WhereOptions): Promise<Matches[] | null> {
  const matches = await Matches.findAll({
    where: { ...filters },
  });

  return matches;
}

async function filterTeamedMatches(filters: matchProperties): Promise<Matches[] | null> {
  const matches = await Matches.findAll({
    include: [
      { model: Teams, as: 'teamHome', attributes: ['teamName'] },
      { model: Teams, as: 'teamAway', attributes: ['teamName'] },
    ],
    where: { ...filters },
  });

  return matches;
}

async function insertMatch(query: matchProperties): Promise<Matches> {
  const newMatch = {} as matchProperties;
  Object.assign(newMatch, query);
  delete newMatch.id;
  if (!query.inProgress) {
    newMatch.inProgress = true;
  }

  const registeredMatch = await Matches.create(newMatch);
  return registeredMatch;
}

async function setInProgressFalse(id: number): Promise<number> {
  const [nLinesUpdated] = await Matches.update(
    { inProgress: false },
    { where: { id } },
  );
  return nLinesUpdated;
}

async function updateMatchScore(id: number, newScore: matchProperties): Promise<number> {
  const [nLinesUpdated] = await Matches.update(newScore, { where: { id } });
  return nLinesUpdated;
}

export default {
  selectAllMatches,
  filterMatches,
  filterTeamedMatches,
  insertMatch,
  setInProgressFalse,
  updateMatchScore,
};
