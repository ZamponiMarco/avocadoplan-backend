import {
  Controller,
  Get,
  Param,
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
import { User } from 'src/common/decorators/user.decorator';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';

@Controller('api/plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get('')
  async getPlans(@Body() body: any = {}) {
    return this.plansService.getPlans(body);
  }

  @Get(':id')
  async getPlanById(@Param('id', new ParseObjectIdPipe()) id) {
    return this.plansService.getPlanById(id);
  }

  @Get('user/owner/:id')
  async getPlansByOwner(
    @Param('id', new ParseObjectIdPipe()) id,
    @Body() body: any = {},
  ) {
    return this.plansService.getPlansByOwner(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user/saved/')
  async getPlansSavedByUser(@User() user, @Body() body: any = {}) {
    return this.plansService.getPlansSavedByUser(user.sub, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @Post('')
  async createPlan(@Body() planDto: PlanDto) {
    return this.plansService.createPlan(planDto);
  }

  @UseGuards(AuthGuard('jwt'), PlanGuard)
  @Put(':id')
  async updatePlanById(
    @Param('id', new ParseObjectIdPipe()) id,
    @Body() planDto: PlanDto,
  ) {
    return this.plansService.updatePlan(id, planDto);
  }

  @UseGuards(AuthGuard('jwt'), PlanGuard)
  @Delete(':id')
  async deletePlanById(@Param('id', new ParseObjectIdPipe()) id) {
    return this.plansService.deletePlan(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/upvote/:id')
  async upvotePlanById(@Param('id', new ParseObjectIdPipe()) id, @User() user) {
    return this.plansService.upvotePlanById(id, user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/downvote/:id')
  async downvotePlanById(
    @Param('id', new ParseObjectIdPipe()) id,
    @User() user,
  ) {
    return this.plansService.downvotePlanById(id, user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/unvote/:id')
  async unvotePlanById(@Param('id', new ParseObjectIdPipe()) id, @User() user) {
    return this.plansService.unvotePlanById(id, user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/save/:id')
  async savePlanById(@Param('id', new ParseObjectIdPipe()) id, @User() user) {
    return this.plansService.savePlanById(id, user.sub);
  }
}
