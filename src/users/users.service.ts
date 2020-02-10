import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/common/interfaces/user.interface';
import { Model } from 'mongoose';
import { UserDto } from 'src/common/dtos/create-user.dto';

@Injectable()
export class UsersService {
  @InjectModel('User') private readonly userModel: Model<User>;

  async getUserById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async containsUserById(id: string): Promise<Boolean> {
    return await this.userModel.exists({ _id: id });
  }

  async createUser(userDto: UserDto) {
    return await this.userModel(userDto).save();
  }
}
