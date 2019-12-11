import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../../common/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
    @InjectModel('User') private readonly userModel: Model<User>

    async getUsers() {
        return await this.userModel.find().exec();
    }

    async getUserByEmail(userEmail: string): Promise<User> {
        return await this.userModel.findOne({
            email: userEmail
        }).exec();
    }

}
