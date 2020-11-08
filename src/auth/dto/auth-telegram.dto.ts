import { IsInt, IsPhoneNumber, IsString, Length } from 'class-validator';

export class AuthTelegramDto {
     @IsString() @Length(2, 200) firstName: string;
     @IsPhoneNumber('UA') phone: string;
     @IsInt()  telegramId: number;
     telegramUserName: string;
}
