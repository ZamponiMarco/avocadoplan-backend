import * as mongoose from 'mongoose';

export const DishSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: false}
});