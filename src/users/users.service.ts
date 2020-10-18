import { Inject, Injectable } from '@nestjs/common';
import { IUsersService } from './interfaces/iusers.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USERS_REPOSITORY } from '../common/constants/repositories.constants';
import { IUsersRepository } from './interfaces/iusers.repository';
import { IUser } from './interfaces/iuser';
import { USERS_MAPPER } from '../common/constants/mappers.constants';
import { IUsersMapper } from './interfaces/iusers.mapper';
import { BaseService } from '../common/base.service';


@Injectable()
export class UsersService extends BaseService<
    IUser,
    CreateUserDto ,
    UpdateUserDto,
    UserDto,
    IUsersRepository,
    IUsersMapper> implements IUsersService {
    constructor(
        @Inject(USERS_REPOSITORY) private usersRepository: IUsersRepository,
        @Inject(USERS_MAPPER) private usersMapper: IUsersMapper,
    ) {
        super(usersRepository, usersMapper);
    }
}
