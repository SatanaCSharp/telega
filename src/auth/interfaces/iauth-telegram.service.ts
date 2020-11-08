import { IBaseAuthService } from './ibase-auth.service';
import { CreateTelegramUserDto } from '../../telegram-users/dto/create-telegram-user.dto';
import { AuthSignInDto } from '../dto/auth-sign-in.dto';

export interface IAuthTelegramService extends IBaseAuthService<CreateTelegramUserDto | number, AuthSignInDto> {
    signIn(telegramId: number): Promise<AuthSignInDto>;
}
