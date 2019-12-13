import { IsString, IsHash, IsEmail } from "class-validator";

export class CredentialsDto {

    @IsEmail()
    readonly email: string;

    @IsHash('md5')
    readonly password: string;
}