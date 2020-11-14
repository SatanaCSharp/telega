import { IUser } from '../interfaces/iuser';

export class UserTelegramDto {
    public id?: number;
    public firstName: string;
    public phone: string;
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
