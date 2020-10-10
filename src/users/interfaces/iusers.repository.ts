import { IBaseRepository } from '../../common/base.interfaces/ibase.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUser } from './iuser';

export interface IUsersRepository extends IBaseRepository<CreateUserDto, UpdateUserDto, IUser> {
    findByEmail(email: string): Promise<IUser|null>;
}
