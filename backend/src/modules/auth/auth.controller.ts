import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CredentialsDto } from '../../common/dtos/create-credential.dto';
import { AuthService } from './auth.service';

@Controller('/api/auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async loginWithCredentials(@Body() credentialsDto: CredentialsDto) {
        return this.authService.loginWithCredentials(credentialsDto);
    }

}
