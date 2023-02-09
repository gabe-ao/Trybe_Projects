import { Schema, Model, model, models } from 'mongoose';
import AbstractODM from './AbstractODM';
import IMotorcycle from '../Interfaces/IMotorcycle';
import motorStdSelect from './Projections/motorStdSelect';

class MotorcycleODM extends AbstractODM<IMotorcycle> {
  protected schema: Schema<IMotorcycle>;
  protected model: Model<IMotorcycle>;
  
  constructor() {
    super();
    this.schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, default: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });

    this.model = models.Motorcycle || model('Motorcycle', this.schema);
  }

  public async create(motorcycle: IMotorcycle): Promise<IMotorcycle> {
    return this.model.create({ ...motorcycle });
  }

  public async findAll(): Promise<IMotorcycle[]> {
    return this.model.find({}, motorStdSelect);
  }

  public async findById(id: string): Promise<IMotorcycle> {
    const motorcycle = await this.model.findById({ _id: id });
    if (!motorcycle) {
      throw Error(JSON.stringify({ type: 'NotFound', message: 'Motorcycle not found' }));
    }
    return motorcycle;
  }

  public async updateOneById(id: string, motorcycle: IMotorcycle): Promise<IMotorcycle> {
    const updatedMotorcycle = await this.model.findByIdAndUpdate(
      { _id: id },
      motorcycle,
      { returnDocument: 'after' },
    ).select(motorStdSelect);
    if (!updatedMotorcycle) {
      throw Error(JSON.stringify({ type: 'NotFound', message: 'Motorcycle not found' }));
    }
    return updatedMotorcycle;
  }
}

export default MotorcycleODM;