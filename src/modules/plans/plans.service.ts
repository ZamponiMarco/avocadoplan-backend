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

  async getPlansSavedByUser(userId: string, options: any) {
    let saved = (await this.usersService.getUserById(userId)).saved;
    return await this.getPlansWithFilter({ _id: { $in: saved } }, options);
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
    return this.votePlanById(planId, userId, -1);
  }

  async upvotePlanById(planId: string, userId: string) {
    return this.votePlanById(planId, userId, 1);
  }

  async unvotePlanById(planId: string, userId: string) {
    return this.votePlanById(planId, userId, 0);
  }

  async savePlanById(planId: string, userId: string) {
    let user = await this.usersService.getUserById(userId);
    let saved = user.saved;
    if (!saved.some(savedPlan => savedPlan.toString() == planId)) {
      saved.push(planId);
      this.usersService.updateUser(userId, user);
      return true;
    }
    return false;
  }

  private async votePlanById(planId: string, userId: string, vote: number) {
    let plan = await this.getPlanById(planId);
    let user = await this.usersService.getUserById(userId);
    if (!plan) {
      return false;
    }
    let planVotes = plan.votes;
    let userVotes = user.votes.get(planId.toString())
      ? user.votes.get(planId.toString())
      : 0;
    if (userVotes != vote) {
      planVotes = planVotes - userVotes + vote;
      vote == 0 ? user.votes.delete(planId) : user.votes.set(planId, vote);
      this.usersService.updateUser(userId, user);
      await this.planModel
        .updateOne({ _id: planId }, { votes: planVotes })
        .exec();
      return true;
    }
    return false;
  }

  private async getPlansWithFilter(filter: any, options: any) {
    return await this.planModel
      .find(filter)
      .select(options.reduced ? { days: false } : {})
      .limit(options.limit ? +options.limit : 0)
      .skip(options.skip ? +options.skip : 0)
      .sort(options.sort ? options.sort : '$natural')
      .exec();
  }
}
