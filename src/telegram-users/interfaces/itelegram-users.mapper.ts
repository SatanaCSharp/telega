import { DBEntitiesToDtoMapper, DBEntityToDtoMapper } from '../../common/base.interfaces/db-entity.mapper';
import { IUser } from '../../users/interfaces/iuser';
import { TelegramUserDto } from '../dto/telegram-user.dto';

export interface ITelegramUsersMapper extends DBEntityToDtoMapper<Partial<IUser>, TelegramUserDto>,
    DBEntitiesToDtoMapper<Partial<IUser>, TelegramUserDto> { }
