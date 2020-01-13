import { CanActivate, ExecutionContext, Injectable, UseGuards } from "@nestjs/common";
import { PlansService } from "../plans/plans.service";
import { Plan } from "src/common/interfaces/plan.interface";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "../users/users.service";
import { User } from "src/common/interfaces/user.interface";

@Injectable()
export class OwnerGuard implements CanActivate {

    constructor(
        private readonly plansService: PlansService,
        private readonly usersService: UsersService
    ){ }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        let user: User = await this.usersService.getUserByEmail(context.switchToHttp().getRequest().user.email);
        let planId: string = context.switchToHttp().getRequest().params.id;
        let plan: Plan = await this.plansService.getPlanById(planId);
        return user.roles.some(role => role == "moderator") || user._id.toString() == plan.owner.toString();
    }
}