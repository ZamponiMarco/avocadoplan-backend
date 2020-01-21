import * as mongoose from 'mongoose';
import { Day } from './day.interface';

export interface Plan extends mongoose.Document {
  readonly _id: string;
  readonly title: string;
  readonly description: string;
  readonly drinkDescription: string;
  readonly owner: string;
  readonly upvotes: number;
  readonly downvotes: number;
  readonly tags: string[];
  readonly days: Day[];
}
