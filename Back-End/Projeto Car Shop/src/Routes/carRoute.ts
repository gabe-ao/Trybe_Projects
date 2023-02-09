import { Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoute = Router();

carRoute.post(
  '/',
  (req, res, next) => new CarController(req, res, next).post(),
);

carRoute.get(
  '/',
  (req, res, next) => new CarController(req, res, next).getAll(),
);

carRoute.get(
  '/:id',
  (req, res, next) => new CarController(req, res, next).getById(),
);

carRoute.put(
  '/:id',
  (req, res, next) => new CarController(req, res, next).put(),
);

export default carRoute;