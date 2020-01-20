import { Controller, Get, Param, Post, Body, Delete, Put, UsePipes, ValidationPipe, UseGuards, Query } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlanDto } from '../../common/dtos/create-plan.dto';
import { AuthGuard } from '@nestjs/passport';
import { OwnerGuard } from '../auth/guards/owner.guard';

@Controller('api/plans')
export class PlansController {

    constructor(
        private readonly plansService: PlansService
    ) { }

    @Get('')
    async getPlans(@Body() body) {
        return this.plansService.getPlans({
            limit: +body.limit, 
            skip: +body.skip,
            sort: body.sort,
        });
    }

    @Get(':id')
    async getPlanById(@Param() params) {
        return this.plansService.getPlanById(params.id);
    }

    @Get('user/:id')
    async getPlansByOwner(@Param() params) {
        return this.plansService.getPlansByOwner(params.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('')
    @UsePipes(new ValidationPipe())
    async createPlan(@Body() planDto: PlanDto) {
        return this.plansService.createPlan(planDto);
    }

    @UseGuards(AuthGuard('jwt'), OwnerGuard)
    @Put(':id')
    async updatePlanById(@Param() params, @Body() planDto: PlanDto) {
        return this.plansService.updatePlan(params.id, planDto);
    }

    @UseGuards(AuthGuard('jwt'), OwnerGuard)
    @Delete(':id')
    async deletePlanById(@Param() params) {
        return this.plansService.deletePlan(params.id);
    }
}
