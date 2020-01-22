import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  readonly _id: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly upvotes: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly downvotes: string[];
}
