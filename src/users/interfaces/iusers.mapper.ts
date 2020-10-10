import { IBaseMapper } from '../../common/base.interfaces/ibase.mapper';
import { UserDto } from '../dto/user.dto';
import { IUser } from './iuser';

export interface IUsersMapper extends IBaseMapper<IUser, UserDto> {}
