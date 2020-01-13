import { Document } from 'mongoose';

export interface User extends Document {
    readonly _id: string;
    readonly email: string;
    readonly password: string;
    readonly roles: string[];
}
