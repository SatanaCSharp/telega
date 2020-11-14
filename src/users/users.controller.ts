import { Body, Controller, Get, Inject, Param, Put, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(@Inject(UsersService) private usersService: UsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    public async findOne(@Param() params): Promise<UserDto> {
        return this.usersService.findById(params.id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id')
    public async update(@Param() params, @Body() updateUserDto: UserDto): Promise<UserDto> {
        return this.usersService.update(params.id, updateUserDto);
    }
}
