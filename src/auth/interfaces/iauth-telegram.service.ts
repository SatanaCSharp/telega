import { IBaseAuthService } from './ibase-auth.service';
import { AuthSignInDto } from '../dto/auth-sign-in.dto';
import { AuthTelegramSignInDto } from '../dto/auth-telegram-sign-in.dto';
import { AuthTelegramSignUpDto } from '../dto/auth-telegram-sign-up.dto';

export interface IAuthTelegramService extends IBaseAuthService<AuthTelegramSignUpDto | AuthTelegramSignInDto, AuthSignInDto> {
    signIn(authCredentialDto: AuthTelegramSignInDto): Promise<AuthSignInDto>;
}
