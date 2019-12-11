import * as mongoose from 'mongoose';

export const PlanSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true}
});