import { IBaseService } from '../../common/base.interfaces/ibase.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';

export interface IUsersService extends IBaseService<CreateUserDto, UpdateUserDto, UserDto> {
}
