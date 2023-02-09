import { Schema, Model, model, models } from 'mongoose';
import AbstractODM from './AbstractODM';
import ICar from '../Interfaces/ICar';
import carStdSelect from './Projections/carStdSelect';

class CarODM extends AbstractODM<ICar> {
  protected schema: Schema<ICar>;
  protected model: Model<ICar>;

  constructor() {
    super();
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, default: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });

    this.model = models.Car || model('Car', this.schema);
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async findAll(): Promise<ICar[]> {
    return this.model.find({}, carStdSelect);
  }

  public async findById(id: string): Promise<ICar> {
    const car = await this.model.findById({ _id: id });
    if (!car) throw Error(JSON.stringify({ type: 'NotFound', message: 'Car not found' }));
    return car;
  }

  public async updateOneById(id: string, car: ICar): Promise<ICar> {
    const updatedCar = await this.model.findByIdAndUpdate(
      { _id: id },
      car,
      { returnDocument: 'after' },
    ).select(carStdSelect);
    if (!updatedCar) throw Error(JSON.stringify({ type: 'NotFound', message: 'Car not found' }));
    return updatedCar;
  }
}

export default CarODM;