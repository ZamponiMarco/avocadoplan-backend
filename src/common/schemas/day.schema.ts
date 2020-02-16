import * as mongoose from 'mongoose';
import { MealSchema } from './meal.schema';

export const DaySchema = new mongoose.Schema({
  weekDay: { type: String, required: true },
  week: { type: Number, required: true },
  meals: [{ type: MealSchema, required: true }],
});
