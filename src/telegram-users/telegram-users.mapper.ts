import { ITelegramUsersMapper } from './interfaces/itelegram-users.mapper';
import { IUser } from '../users/interfaces/iuser';
import { TelegramUserDto } from './dto/telegram-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramUsersMapper implements ITelegramUsersMapper {
    mapToDto(databaseObject: Partial<IUser>): TelegramUserDto {
        return new TelegramUserDto(databaseObject);
    }
    mapToDtos(dbEntities: Partial<IUser>[]): TelegramUserDto[] {
        return dbEntities.map((u) => new TelegramUserDto(u));
    }
}
