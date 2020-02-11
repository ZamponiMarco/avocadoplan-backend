import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  votes: { type: Map, of: Number },
  saved: [{ type: mongoose.Types.ObjectId }],
});
