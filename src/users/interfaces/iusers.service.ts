import { CreatableService, SingleFindableService, UpdatableService } from '../../common/base.interfaces/ibase.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDto } from '../dto/user.dto';

export interface IUsersService extends SingleFindableService<UserDto>,
    CreatableService<CreateUserDto, UserDto>,
    UpdatableService<UpdateUserDto, UserDto> {}
