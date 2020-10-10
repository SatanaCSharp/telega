import { IUsersMapper } from './interfaces/iusers.mapper';
import { IUser } from './interfaces/iuser';
import { UserDto } from './dto/user.dto';

export class UsersMapper implements IUsersMapper {
    mapToDTO(databaseObject: IUser): UserDto {
        const userDto = new UserDto(databaseObject);
        userDto.role = databaseObject.userRoles[0].role.name;
        userDto.permission = databaseObject.userRoles[0].role.permission;
        return userDto;
    }

    mapToDTOs(databaseObjects: IUser[]): UserDto[] {
        return databaseObjects.map((user) => {
            const userDto = new UserDto(user);
            userDto.role = user.userRoles[0].role.name;
            return userDto;
        });
    }

}
