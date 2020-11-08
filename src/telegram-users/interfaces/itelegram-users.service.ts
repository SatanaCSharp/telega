import { CreatableService, SingleFindableService } from '../../common/base.interfaces/ibase.service';
import { CreateTelegramUserDto } from '../dto/create-telegram-user.dto';
import { TelegramUserDto } from '../dto/telegram-user.dto';

export interface ITelegramUsersService extends SingleFindableService<TelegramUserDto>,
    CreatableService<CreateTelegramUserDto, TelegramUserDto> {}
