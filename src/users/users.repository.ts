import { Injectable } from '@nestjs/common';
import { IUsersRepository } from './interfaces/iusers.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/iuser';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { BaseRepository } from '../common/base.repository/base.repository';

@Injectable()
export class UsersRepository extends BaseRepository<IUser, CreateUserDto, UpdateUserDto> implements IUsersRepository {
    constructor(@InjectModel(User) private userModel: typeof User) {
        super(userModel)
    }

    public findByEmail(email: string): Promise<IUser | null> {
        return this.userModel.findOne({ where: { email } });
    }
}
