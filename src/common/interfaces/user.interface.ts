import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  readonly _id: string;
  readonly votes: Map<string, number>;
  readonly saved: mongoose.Types.ObjectId[];
}
