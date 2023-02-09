import { Request, Response } from 'express';
import teamsService from '../service/teams.service';

async function getAllTeams(_req: Request, res: Response): Promise<void> {
  const teams = await teamsService.getAllTeams();
  res.status(200).json(teams);
}

async function getTeamById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  if (Number.isNaN(id) || typeof id !== 'number') {
    throw Error(JSON.stringify({ type: 'invalidId', message: 'A id number is required' }));
  }
  const team = await teamsService.getTeam(id);
  res.status(200).json(team);
}

export default {
  getAllTeams,
  getTeamById,
};
