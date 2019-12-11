import { Document } from 'mongoose';

export interface Plan extends Document{
    readonly title: string;
    readonly description: string;
}