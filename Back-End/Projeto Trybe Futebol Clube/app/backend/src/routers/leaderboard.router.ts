import { Router } from 'express';
import leaderboardController from '../controller/leaderboard.controller';
import 'express-async-errors';

const leaderboardRouter = Router();

leaderboardRouter.get('/', leaderboardController.getLeaderboard);
leaderboardRouter.get('/home', leaderboardController.getLeaderboard);
leaderboardRouter.get('/away', leaderboardController.getLeaderboard);

export default leaderboardRouter;
