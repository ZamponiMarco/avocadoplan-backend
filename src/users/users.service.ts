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

  async upvotePlanById(userId: string, planId: string) {
    let upvotes = (await this.getUserById(userId)).upvotes;
    if (!upvotes.some(upvote => upvote.toString() == planId.toString())) {
      upvotes.push(planId);
      return await this.userModel
        .updateOne({ _id: userId }, { upvotes: upvotes })
        .exec();
    }
    return false;
  }

  async downvotePlanById(userId: string, planId: string) {
    let downvotes = (await this.getUserById(userId)).downvotes;
    if (!downvotes.some(downvote => downvote.toString() == planId.toString())) {
      downvotes.push(planId);
      return await this.userModel
        .updateOne({ _id: userId }, { downvotes: downvotes })
        .exec();
    }
    return false;
  }
}
