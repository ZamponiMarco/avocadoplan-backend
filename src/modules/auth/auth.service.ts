import { Injectable, ForbiddenException } from '@nestjs/common';
import { User } from '../../common/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { CredentialsDto } from '../../common/dtos/create-credential.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService
    ){}

    async loginWithCredentials(credentialsDto: CredentialsDto): Promise<User>{
        let user = await this.usersService.getUserByEmail(credentialsDto.email);

        if (!user || user.password != credentialsDto.password) {
            throw new ForbiddenException();
        }

        return user;
    }

}
