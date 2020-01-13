import { IsEmail, IsHash, IsArray } from "class-validator";
import { Type } from "class-transformer";

export class UserDto{
    @IsEmail()
    readonly email: string;

    @IsHash('md5')
    readonly password: string;

    @Type(() => String)
    @IsArray()
    readonly roles: string[];
}