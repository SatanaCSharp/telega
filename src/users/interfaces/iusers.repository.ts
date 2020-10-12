import {
    CreateDbEntityRepository,
    FindDbEntitiesRepository,
    FindDbEntityRepository,
    UpdateDbEntityRepository,
} from '../../common/base.interfaces/ibase.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUser } from './iuser';

export interface IUsersRepository extends FindDbEntitiesRepository<IUser>,
    FindDbEntityRepository<IUser>,
    CreateDbEntityRepository<CreateUserDto, IUser>,
    UpdateDbEntityRepository<UpdateUserDto> {
    findByEmail(email: string): Promise<IUser | null>;
}
