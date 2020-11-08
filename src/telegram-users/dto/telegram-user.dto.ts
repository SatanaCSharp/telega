import { IUser } from '../../users/interfaces/iuser';

export class TelegramUserDto {
    public id?: number;
    public firstName: string;
    public phone: number;
    public telegramId: number;
    public telegramUserName: string;

    constructor(user: Partial<IUser>) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.phone = user.phone;
        this.telegramId = user.telegramId;
        this.telegramUserName = user.telegramUserName;
    }
}
