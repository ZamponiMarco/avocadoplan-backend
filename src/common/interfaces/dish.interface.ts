import * as mongoose from 'mongoose';

export interface Dish extends mongoose.Document {
  readonly title: string;
  readonly description: string;
}
