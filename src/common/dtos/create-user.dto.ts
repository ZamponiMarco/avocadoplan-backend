import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  readonly _id: string;

  @IsOptional()
  readonly votes: Map<string, number>;
}
