import { IsInt } from 'class-validator';

export class AuthTelegramSignInDto {
    @IsInt()  telegramId: number;
}
