import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plan } from '../../common/interfaces/plan.interface';
import { PlanDto } from '../../common/dtos/create-plan.dto';

@Injectable()
export class PlansService {
  @InjectModel('Plan') private readonly planModel: Model<Plan>;

  async getPlans(options: any): Promise<any[]> {
    return await this.planModel
      .find()
      .select(options.reduced ? { days: false } : {})
      .limit(options.limit ? +options.limit : 0)
      .skip(options.skip ? +options.skip : 0)
      .sort(options.sort ? options.sort : '$natural')
      .exec();
  }

  async getPlanById(id: string): Promise<Plan> {
    return await this.planModel.findById(id).exec();
  }

  async getPlansByOwner(ownerId: string, options: any): Promise<Plan[]> {
    return await this.planModel
      .find({ owner: ownerId })
      .select(options.reduced ? { days: false } : {})
      .limit(options.limit ? +options.limit : 0)
      .skip(options.skip ? +options.skip : 0)
      .sort(options.sort ? options.sort : '$natural')
      .exec();
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
}
