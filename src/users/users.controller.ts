import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { USERS_SERVICE } from '../common/constants/services.constants';
import { IUsersService } from './interfaces/iusers.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(@Inject(USERS_SERVICE) private usersService: IUsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    public async findAll(): Promise<UserDto[]> {
        return this.usersService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    public async findOne(@Param() params): Promise<UserDto> {
        return this.usersService.findOne(params.id);
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

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    public async delete(@Param() params): Promise<void> {
        return this.usersService.delete(params.id);
    }
}
