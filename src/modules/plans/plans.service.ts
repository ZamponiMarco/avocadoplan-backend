import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plan } from '../../common/interfaces/plan.interface';
import { PlanDto } from '../../common/dtos/create-plan.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PlansService {
  constructor(private readonly usersService: UsersService) {}

  @InjectModel('Plan') private readonly planModel: Model<Plan>;

  async getPlans(options: any): Promise<any[]> {
    return await this.getPlansWithFilter({}, options);
  }

  async getPlanById(id: string): Promise<Plan> {
    return await this.planModel.findById(id).exec();
  }

  async getPlansByOwner(ownerId: string, options: any): Promise<Plan[]> {
    return await this.getPlansWithFilter({ owner: ownerId }, options);
  }

  async createPlan(planDto: PlanDto): Promise<Plan> {
    return await this.planModel(planDto).save();
  }

  async updatePlan(id: string, planDto: PlanDto): Promise<Plan> {
    return await this.planModel.updateOne({ _id: id }, planDto).exec();
  }

  async deletePlan(id: string): Promise<Plan> {
    return await this.planModel.deleteOne({ _id: id }).exec();
  }

  async downvotePlanById(planId: string, userId: string) {
    let votes = await (await this.getPlanById(planId)).votes;
    let playerVotes = (await this.usersService.getUserById(userId)).votes;
    if (playerVotes.get(planId.toString()) != -1) {
      votes = votes - playerVotes.get(planId.toString()) - 1;
      playerVotes.set(planId, -1);
      this.usersService.updateUser(userId, { _id: userId, votes: playerVotes });
      await this.planModel.updateOne({ _id: planId }, { votes: votes }).exec();
      return true;
    }
    return false;
  }

  async upvotePlanById(planId: string, userId: string) {
    let votes = await (await this.getPlanById(planId)).votes;
    let playerVotes = (await this.usersService.getUserById(userId)).votes;
    if (playerVotes.get(planId.toString()) != 1) {
      votes = votes - playerVotes.get(planId.toString()) + 1;
      playerVotes.set(planId, +1);
      this.usersService.updateUser(userId, { _id: userId, votes: playerVotes });
      await this.planModel.updateOne({ _id: planId }, { votes: votes }).exec();
      return true;
    }
    return false;
  }

  async getPlansWithFilter(filter: any, options: any) {
    return await this.planModel
      .find(filter)
      .select(options.reduced ? { days: false } : {})
      .limit(options.limit ? +options.limit : 0)
      .skip(options.skip ? +options.skip : 0)
      .sort(options.sort ? options.sort : '$natural')
      .exec();
  }
}
