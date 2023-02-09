import { Request, Response } from 'express';
import leaderboardService from '../service/leaderboard.service';

async function getLeaderboard(req: Request, res: Response): Promise<void> {
  const { path } = req;
  let venue: 'home' | 'away' | undefined;
  if (path.includes('home')) venue = 'home';
  if (path.includes('away')) venue = 'away';

  const leaderboard = await leaderboardService.createLeaderboard(venue);
  res.status(200).json(leaderboard);
}

export default {
  getLeaderboard,
};
