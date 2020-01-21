import { Module } from '@nestjs/common';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanSchema } from '../../common/schemas/plan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Plan',
        schema: PlanSchema,
      },
    ]),
  ],
  controllers: [PlansController],
  providers: [PlansService],
  exports: [PlansService],
})
export class PlansModule {}
