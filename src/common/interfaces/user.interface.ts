import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  readonly _id: string;
  readonly upvotes: string[];
  readonly downvotes: string[];
}
