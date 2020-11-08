import { CreateDbEntityRepository } from '../../common/base.interfaces/ibase.repository';
import { IUser } from '../../users/interfaces/iuser';
import { CreateTelegramUserDto } from '../dto/create-telegram-user.dto';

export interface ITelegramUsersRepository extends CreateDbEntityRepository<CreateTelegramUserDto, Partial<IUser>> {
    findByTelegramId(telegramId: number): Promise<Partial<IUser> | null>;
    findByPhone(phone: string): Promise<Partial<IUser> | null>;
}
