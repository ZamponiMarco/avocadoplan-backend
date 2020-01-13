import { Controller, Post, Request, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CredentialsDto } from 'src/common/dtos/create-credential.dto';

@Controller('/api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    
    @UseGuards(AuthGuard('local'))
    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

}
