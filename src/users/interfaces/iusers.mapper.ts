import { DBEntitiesToDtoMapper, DBEntityToDtoMapper } from '../../common/base.interfaces/db-entity.mapper';
import { IUser } from './iuser';
import { UserDto } from '../dto/user.dto';

export interface IUsersMapper extends DBEntityToDtoMapper<IUser, UserDto>, DBEntitiesToDtoMapper<IUser, UserDto> {
}
