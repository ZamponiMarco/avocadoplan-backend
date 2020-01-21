import * as mongoose from 'mongoose';
import { DishSchema } from './dish.schema';

export const MealSchema = new mongoose.Schema({
  type: { type: String, required: true },
  dishes: [{ type: DishSchema, required: true }],
});
