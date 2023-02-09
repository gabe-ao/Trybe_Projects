import { Request, Response, NextFunction } from 'express';
import AbstractController from './AbstractController';
import MotorcycleService from '../Services/MotorcycleService';
import IMotorcycle from '../Interfaces/IMotorcycle';

class MotorcycleController extends AbstractController {
  private service: MotorcycleService;
  
  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.service = new MotorcycleService();
  }

  private motorcycleFromReq(): IMotorcycle { 
    return { model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity };
  }

  public async post(): Promise<void> {
    const motorcycle = this.motorcycleFromReq();
    try {
      const registeredMotorcycle = await this.service.register(motorcycle);
      this.res.status(201).json(registeredMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll(): Promise<void> {
    try {
      const allMotorcycles = await this.service.findAll();
      this.res.status(200).json(allMotorcycles);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById(): Promise<void> {
    const { id } = this.req.params;
    try {
      const motorcycle = await this.service.findById(id);
      this.res.status(200).json(motorcycle);
    } catch (error) {
      this.next(error); 
    }
  }

  public async put(): Promise<void> {
    const { id } = this.req.params;
    const motorcycle = this.motorcycleFromReq();

    try {
      const updatedMotorcycle = await this.service.update(id, motorcycle);
      this.res.status(200).json(updatedMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;