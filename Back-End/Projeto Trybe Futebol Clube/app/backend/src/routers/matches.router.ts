import { Router } from 'express';
import validationController from '../controller/validation.controller';
import matchesController from '../controller/matches.controller';

const matchesRouter = Router();

matchesRouter.get('/', matchesController.getAllMatches, matchesController.getMatchesByProgress);
matchesRouter.post('/', validationController.validateNewMatch, matchesController.postNewMatch);
matchesRouter.patch('/:id/finish', matchesController.patchInProgressFalse);

matchesRouter.patch(
  '/:id',
  validationController.validateNewScore,
  matchesController.patchMatchScore,
);

export default matchesRouter;
