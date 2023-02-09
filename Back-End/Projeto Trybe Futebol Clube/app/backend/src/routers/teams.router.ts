import { Router } from 'express';
import teamsController from '../controller/teams.controller';

const teamsRouter = Router();

teamsRouter.get('/', teamsController.getAllTeams);
teamsRouter.get('/:id', teamsController.getTeamById);

export default teamsRouter;
