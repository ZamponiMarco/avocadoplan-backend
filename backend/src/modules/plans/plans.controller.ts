import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { PlansService } from './plans.service';

@Controller('api/plans')
export class PlansController {
    constructor(private readonly plansService: PlansService){}

    @Get('')
    async getPlans(){
        return this.plansService.getPlans();
    }

    @Get(':id')
    async getPlanById(@Param() params){
        return this.plansService.getPlanById(params.id);
    }

    @Post('')
    async createPlan(@Body() body){
        return this.plansService.createPlan(body);
    }

    @Put(':id')
    async updatePlan(@Param() params, @Body() body){
        return this.plansService.updatePlan(params.id, body);
    }

    @Delete(':id')
    async deletePlanById(@Param() params){
        return this.plansService.deletePlan(params.id);
    }
}
