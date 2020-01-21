import { Test, TestingModule } from '@nestjs/testing';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { Plan } from '../../common/interfaces/plan.interface';
import { PlanDto } from '../../common/dtos/create-plan.dto';
import { PlansModule } from './plans.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('PlansController', () => {
  let plansController: PlansController;
  let plansService: PlansService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        PlansModule,
        MongooseModule.forRoot('mongodb://localhost/test', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }),
      ],
    }).compile();

    plansService = module.get<PlansService>(PlansService);
    plansController = module.get<PlansController>(PlansController);
  });

  describe('getPlans', () => {
    it('should return a list of plans', async () => {
      let result: Plan[];
      jest.spyOn(plansService, 'getPlans').mockResolvedValue(result);
      expect(await plansController.getPlans()).toBe(result);
    });
  });

  describe('createPlan', () => {
    it('should return a plan object', async () => {
      const dto = new PlanDto();
      let result: Plan;
      jest.spyOn(plansService, 'createPlan').mockResolvedValue(result);
      expect(await plansController.createPlan(dto)).toBe(result);
    });
  });
});
