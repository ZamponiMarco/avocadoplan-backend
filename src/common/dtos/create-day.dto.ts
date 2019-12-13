import { IsNumber, ValidateNested, IsArray, Max } from "class-validator";
import { MealDto } from "./create-meal.dto";
import { Type } from "class-transformer";

export class DayDto {

    @IsNumber()
    readonly weekDay: number;

    @IsNumber()
    readonly week: number;

    @ValidateNested()
    @Type(() => MealDto)
    @IsArray()
    readonly meals: MealDto[];
}