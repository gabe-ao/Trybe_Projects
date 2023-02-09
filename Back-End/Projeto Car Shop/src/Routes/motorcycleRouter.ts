import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRoute = Router();

motorcycleRoute.post(
  '/',
  (req, res, next) => new MotorcycleController(req, res, next).post(),
);

motorcycleRoute.get(
  '/',
  (req, res, next) => new MotorcycleController(req, res, next).getAll(),
);

motorcycleRoute.get(
  '/:id',
  (req, res, next) => new MotorcycleController(req, res, next).getById(),
);

motorcycleRoute.put(
  '/:id',
  (req, res, next) => new MotorcycleController(req, res, next).put(),
);

export default motorcycleRoute;