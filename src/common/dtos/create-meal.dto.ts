import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DishDto } from './create-dish.dto';

export class MealDto {
  @IsString()
  readonly type: string;

  @ValidateNested()
  @Type(() => DishDto)
  @IsArray()
  readonly dishes: DishDto[];
}
