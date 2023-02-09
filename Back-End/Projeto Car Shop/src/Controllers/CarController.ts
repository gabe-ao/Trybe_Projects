import { Request, Response, NextFunction } from 'express';
import AbstractController from './AbstractController';
import CarService from '../Services/CarService';
import ICar from '../Interfaces/ICar';

class CarController extends AbstractController {
  private service: CarService;
  
  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.service = new CarService();
  }

  private carFromReq(): ICar { 
    return { model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty };
  }

  public async post(): Promise<void> {
    const car = this.carFromReq();
    try {
      const registeredCar = await this.service.register(car);
      this.res.status(201).json(registeredCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async put(): Promise<void> {
    const { id } = this.req.params;
    const car = this.carFromReq();

    try {
      const updatedCar = await this.service.update(id, car);
      this.res.status(200).json(updatedCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll(): Promise<void> {
    try {
      const allCars = await this.service.findAll();
      this.res.status(200).json(allCars);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById(): Promise<void> {
    const { id } = this.req.params;
    try {
      const car = await this.service.findById(id);
      this.res.status(200).json(car);
    } catch (error) {
      this.next(error); 
    }
  }
}

export default CarController;