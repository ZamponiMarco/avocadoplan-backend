import { IsString } from "class-validator";

export class PlanDto{
    @IsString()
    readonly title: string;

    @IsString()
    readonly description: string;
}