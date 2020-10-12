import { IUser } from './interfaces/iuser';
import { UserDto } from './dto/user.dto';
import { IUserMapper } from './interfaces/iuser.mapper';

export class UsersMapper implements IUserMapper  {
    mapToDto(databaseObject: IUser): UserDto {
        return new UserDto(databaseObject);
    }

    mapToDtos(databaseObjects: IUser[]): UserDto[] {
        return databaseObjects.map(u => new UserDto(u));
    }
}

