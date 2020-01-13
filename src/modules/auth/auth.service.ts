import { Injectable, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/common/interfaces/user.interface';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){}

    async login(user: User){
        return {
            access_token: this.jwtService.sign({
                email: user.email,
            })
        };
    }

    async validateUser(email: string, password: string) {
        const user = await this.usersService.getUserByEmail(email);
        if (user && user.password == password) {
            return user;
        }
        return null;
    }

}
