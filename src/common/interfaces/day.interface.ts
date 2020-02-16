import * as mongoose from 'mongoose';
import { Meal } from './meal.interface';

export interface Day extends mongoose.Document {
  readonly weekDay: string;
  readonly week: number;
  readonly meals: Meal[];
}
