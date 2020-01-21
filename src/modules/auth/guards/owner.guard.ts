import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { PlansService } from 'src/modules/plans/plans.service';
import { Plan } from 'src/common/interfaces/plan.interface';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private readonly plansService: PlansService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let isMod: boolean = request.user['permissions'].some(
      per => per === 'moderator',
    );
    let userId: string = request.user['sub'];
    let planId: string = request.params.id;
    let plan: Plan = await this.plansService.getPlanById(planId);
    return isMod || userId == plan.owner;
  }
}
