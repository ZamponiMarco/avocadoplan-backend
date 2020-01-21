import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PlansService } from 'src/modules/plans/plans.service';
import { Plan } from 'src/common/interfaces/plan.interface';

@Injectable()
export class PlanGuard implements CanActivate {
  constructor(private readonly plansService: PlansService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.user['permissions'].some(per => per === 'moderator')) {
      return true;
    }
    let userId: string = request.user['sub'];
    let planId: string = request.params.id;
    let plan: Plan = await this.plansService.getPlanById(planId);
    return userId == plan.owner;
  }
}
