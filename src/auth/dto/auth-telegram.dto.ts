import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class AuthTelegramDto {
     @IsString() @Length(2, 200) firstName: string;
     @IsInt() @Min(12) @Max(12) phone: number;
     @IsInt()  telegramId: number;
     @IsString() @Length(2, 200) telegramUserName: string;
}
