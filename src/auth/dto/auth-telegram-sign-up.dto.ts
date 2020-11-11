import { IsString } from 'class-validator';
import { EUser } from '../../users/enums/user.enum';
import { AuthTelegramDto } from './auth-telegram.dto';

export class AuthTelegramSignUpDto extends AuthTelegramDto {
    @IsString() userType: EUser;
}
