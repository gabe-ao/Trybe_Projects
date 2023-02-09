import { Request, Response, NextFunction } from 'express';
import { loginReqSchema, newMatchSchema, newScoreSchema } from './schemas';

async function validateLoginReq(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const { email, password } = req.body;
  if (!email || !password) {
    throw Error(JSON.stringify({ type: 'badLoginReq', message: 'All fields must be filled' }));
  }

  const { error } = loginReqSchema.validate({ email, password });
  if (error) {
    throw Error(JSON.stringify({ type: 'invalidUser', message: 'Incorrect email or password' }));
  }
  next();
}

async function validateNewMatch(req: Request, _res: Response, next: NextFunction):
Promise<void> {
  const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = req.body;
  const { error } = newMatchSchema.validate(
    { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals },
  );

  if (error) {
    throw Error(JSON.stringify({ type: 'badNewMatchReq', message: `${error.message}` }));
  }
  next();
}

async function validateNewScore(req: Request, _res: Response, next: NextFunction):
Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id) || typeof id !== 'number') {
    throw Error(JSON.stringify({ type: 'invalidId', message: 'A id number is required' }));
  }

  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { error } = newScoreSchema.validate(
    { homeTeamGoals, awayTeamGoals },
  );

  if (error) {
    throw Error(JSON.stringify({ type: 'badNewScoreReq', message: `${error.message}` }));
  }
  next();
}
export default {
  validateLoginReq,
  validateNewMatch,
  validateNewScore,
};
