import { Request, Response, NextFunction } from 'express';
import matchProperties from '../interfaces/matchProperties';
import matchesService from '../service/matches.service';
import authController from './auth.controller';

async function getAllMatches(req: Request, res: Response, next: NextFunction): Promise<void> {
  const queries = Object.values(req.query);
  if (queries.length > 0) {
    next();
    return;
  }

  const matches = await matchesService.searchAllMatches();
  res.status(200).json(matches);
}

async function getMatchesByProgress(req: Request, res: Response): Promise<void> {
  const stringQuery = req.query.inProgress;
  let inProgress: boolean;

  if (stringQuery === 'true') {
    inProgress = true;
  } else if (stringQuery === 'false') {
    inProgress = false;
  } else {
    throw Error(JSON.stringify({
      type: 'missingQuery', message: 'The inProgress query must be a boolean and is required',
    }));
  }

  const matches = await matchesService.filterTeamedMatches({ inProgress } as matchProperties);
  res.status(200).json(matches);
}

async function postNewMatch(req: Request, res: Response): Promise<void> {
  const token = req.header('authorization');
  if (!token) throw Error(JSON.stringify({ type: 'emptyToken', message: 'Token is required' }));
  authController.validateUserToken(token);
  const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = req.body;

  const registeredMatch = await matchesService.createNewMatch(
    { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals },
  );
  res.status(201).json(registeredMatch);
}

async function patchInProgressFalse(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id) || typeof id !== 'number') {
    throw Error(JSON.stringify({ type: 'invalidId', message: 'A id number is required' }));
  }

  await matchesService.finishMatch(id);
  res.status(200).json({ message: 'Finished' });
}

async function patchMatchScore(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const { homeTeamGoals, awayTeamGoals } = req.body;

  await matchesService.setMatchScore(id, { homeTeamGoals, awayTeamGoals } as matchProperties);
  res.status(200).json({ message: 'Match score successfully updated' });
}

export default {
  getAllMatches,
  getMatchesByProgress,
  postNewMatch,
  patchInProgressFalse,
  patchMatchScore,
};
