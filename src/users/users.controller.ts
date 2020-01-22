import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'src/common/dtos/create-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUserById(@Param() params) {
    return this.usersService.getUserById(params.id);
  }

  @UsePipes(new ValidationPipe())
  @Post('')
  async createUser(@Body() userDto: UserDto) {
    return this.usersService.createUser(userDto);
  }
}
