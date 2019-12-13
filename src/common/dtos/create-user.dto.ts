import { IsEmail, IsHash } from "class-validator";

export class UserDto{
    @IsEmail()
    readonly email: string;

    @IsHash('md5')
    readonly password: string;
}