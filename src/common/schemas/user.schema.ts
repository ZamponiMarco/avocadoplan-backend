import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  upvotes: [{ type: mongoose.Types.ObjectId }],
  downvotes: [{ type: mongoose.Types.ObjectId }],
});
