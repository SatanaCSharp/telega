import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../common/base.repository';
import { IUser } from '../users/interfaces/iuser';
import { CreateTelegramUserDto } from './dto/create-telegram-user.dto';
import { UpdateTelegramUserDto } from './dto/update-telegram-user.dto';
import { User } from '../users/users.model';
import { ITelegramUsersRepository } from './interfaces/itelegram-users.repository';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TelegramUsersRepository extends
    BaseRepository<Partial<IUser>, CreateTelegramUserDto, UpdateTelegramUserDto> implements ITelegramUsersRepository {

    constructor(@InjectModel(User) private userModel: typeof User) {
        super(userModel);
    }

    public findByTelegramId(telegramId: number): Promise<Partial<IUser> | null> {
        return this.userModel.findOne({ where: { telegramId } });
    }
    public findByPhone(phone: string): Promise<IUser | null> {
        return this.userModel.findOne({ where: { phone } });
    }
}
