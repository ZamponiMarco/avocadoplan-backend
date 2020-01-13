import { Controller, Get, Param, Post, Body, Delete, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlanDto } from '../../common/dtos/create-plan.dto';

@Controller('api/plans')
export class PlansController {
    
    constructor(
        private readonly plansService: PlansService
    ) { }

    @Get('')
    async getPlans() {
        return this.plansService.getPlans();
    }

    @Get(':id')
    async getPlanById(@Param() params) {
        return this.plansService.getPlanById(params.id);
    }

    @Get('user/:id')
    async getPlansByOwner(@Param() params) {
        return this.plansService.getPlansByOwner(params.id);
    }

    @Post('')
    @UsePipes(new ValidationPipe())
    async createPlan(@Body() planDto: PlanDto) {
        return this.plansService.createPlan(planDto);
    }

    @Put(':id')
    async updatePlan(@Param() params, @Body() planDto: PlanDto) {
        return this.plansService.updatePlan(params.id, planDto);
    }

    @Delete(':id')
    async deletePlanById(@Param() params) {
        return this.plansService.deletePlan(params.id);
    }
}
