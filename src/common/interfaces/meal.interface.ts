import * as mongoose from 'mongoose';
import { Dish } from './dish.interface';

export interface Meal extends mongoose.Document{
    readonly type: string;
    readonly dishes: Dish[];
}