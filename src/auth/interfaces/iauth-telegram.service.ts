import { IBaseAuthService } from './ibase-auth.service';
import { CreateTelegramUserDto } from '../../telegram-users/dto/create-telegram-user.dto';
import { AuthSignInDto } from '../dto/auth-sign-in.dto';
import { AuthTelegramSignInDto } from '../dto/auth-telegram-sign-in.dto';

export interface IAuthTelegramService extends IBaseAuthService<CreateTelegramUserDto | AuthTelegramSignInDto, AuthSignInDto> {
    signIn(authCredentialDto: AuthTelegramSignInDto): Promise<AuthSignInDto>;
}
