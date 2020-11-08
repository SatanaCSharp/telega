import { IUser } from './interfaces/iuser';
import { UserDto } from './dto/user.dto';
import { IUsersMapper } from './interfaces/iusers.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersMapper implements IUsersMapper  {
    mapToDto(databaseObject: IUser): UserDto {
        return new UserDto(databaseObject);
    }

    mapToDtos(databaseObjects: IUser[]): UserDto[] {
        return databaseObjects.map(u => new UserDto(u));
    }
}

