import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { IUser } from './interfaces/iuser';
import { BaseService } from '../common/base.service';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';


@Injectable()
export class UsersService extends BaseService<UserDto, IUser> {
    constructor(@InjectModel(User) private userModel: typeof User) {
        super(userModel);
    }
}
