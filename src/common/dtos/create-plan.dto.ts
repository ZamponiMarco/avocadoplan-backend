import { IsString, IsArray, ValidateNested } from 'class-validator';
import { DayDto } from './create-day.dto';
import { Type } from 'class-transformer';

export class PlanDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly drinkDescription: string;

  @IsString()
  readonly owner: string;

  @IsArray()
  @IsString({ each: true })
  readonly tags: string[];

  @ValidateNested()
  @Type(() => DayDto)
  @IsArray()
  readonly days: DayDto[];
}
