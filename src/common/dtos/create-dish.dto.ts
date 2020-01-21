import { IsString } from 'class-validator';

export class DishDto {
  @IsString()
  readonly title: String;

  @IsString()
  readonly description: String;
}
