import { Schema, Model, model, models } from 'mongoose';

abstract class AbstractODM<ISomething> {
  protected schema: Schema<ISomething>;
  protected model: Model<ISomething>;

  constructor() {
    this.schema = new Schema<ISomething>();
    this.model = models.Something || model('Something', this.schema);
  }
}

export default AbstractODM;