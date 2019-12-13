import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {

    constructor(
        readonly usersService: UsersService
    ) { }

    @Get('')
    async getUsers(){
        return this.usersService.getUsers();
    }

    @Get(':email')
    async getUserByEmail(@Param() params) {
        return this.usersService.getUserByEmail(params.email);
    }

}
