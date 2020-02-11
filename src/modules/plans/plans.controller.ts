import {
  Controller,
  Get,
  Param,
  Request,
  Post,
  Body,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlanDto } from '../../common/dtos/create-plan.dto';
import { AuthGuard } from '@nestjs/passport';
import { PlanGuard } from '../auth/guards/plan.guard';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/common/decorators/user.decorator';

@Controller('api/plans')
export class PlansController {
  constructor(
    private readonly plansService: PlansService,
    private readonly usersService: UsersService,
  ) {}

  @Get('')
  async getPlans(@Body() body: any = {}) {
    return this.plansService.getPlans(body);
  }

  @Get(':id')
  async getPlanById(@Param() params) {
    return this.plansService.getPlanById(params.id);
  }

  @Get('user/:id')
  async getPlansByOwner(@Param() params, @Body() body: any = {}) {
    return this.plansService.getPlansByOwner(params.id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @Post('')
  async createPlan(@Body() planDto: PlanDto) {
    return this.plansService.createPlan(planDto);
  }

  @UseGuards(AuthGuard('jwt'), PlanGuard)
  @Put(':id')
  async updatePlanById(@Param() params, @Body() planDto: PlanDto) {
    return this.plansService.updatePlan(params.id, planDto);
  }

  @UseGuards(AuthGuard('jwt'), PlanGuard)
  @Delete(':id')
  async deletePlanById(@Param() params) {
    return this.plansService.deletePlan(params.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/upvote/:id')
  async upvotePlanById(@Param() params, @User() user) {
    return this.plansService.upvotePlanById(params.id, user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/downvote/:id')
  async downvotePlanById(@Param() params, @User() user) {
    return this.plansService.downvotePlanById(params.id, user.sub);
  }
}
