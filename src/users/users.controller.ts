import { Body, Controller, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { IUsersService } from './interfaces/iusers.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { USERS_SERVICE } from '../common/di.constants';

@Controller('users')
export class UsersController {
    constructor(@Inject(USERS_SERVICE) private usersService: IUsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    public async findOne(@Param() params): Promise<UserDto> {
        return this.usersService.findById(params.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    public async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id')
    public async update(@Param() params, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
        return this.usersService.update(params.id, updateUserDto);
    }
}
