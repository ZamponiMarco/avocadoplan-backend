import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plan } from '../../common/interfaces/plan.interface';
import { PlanDto } from '../../common/dtos/create-plan.dto';

@Injectable()
export class PlansService {

    @InjectModel('Plan') private readonly planModel: Model<Plan>

    async getPlans(): Promise<Plan[]>{
        return await this.planModel.find().exec();
    }

    async getPlanById(id: string): Promise<Plan>{
        return await this.planModel.findById(id).exec();
    }

    async createPlan(planDto: PlanDto): Promise<Plan>{
        return await new this.planModel(planDto).save();
    }

    async updatePlan(id: string, planDto: PlanDto): Promise<Plan>{
        return await this.planModel.update({_id: id}, planDto).exec();
    }

    async deletePlan(id: string): Promise<Plan>{
        return await this.planModel.deleteOne({_id: id}).exec();
    }
}
