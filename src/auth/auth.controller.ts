import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-creadential.dto';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { AUTH_CREDENTIALS_SERVICE, AUTH_TELEGRAM_SERVICE } from '../common/di.constants';
import { IAuthCredentialsService } from './interfaces/iauth-credentials.service';
import { IAuthTelegramService } from './interfaces/iauth-telegram.service';
import { AuthTelegramSignInDto } from './dto/auth-telegram-sign-in.dto';
import { AuthTelegramSignUpDto } from './dto/auth-telegram-sign-up.dto';
import { AuthTelegramDto } from './dto/auth-telegram.dto';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AUTH_CREDENTIALS_SERVICE) private authCredentialsService: IAuthCredentialsService,
        @Inject(AUTH_TELEGRAM_SERVICE) private authTelegramService: IAuthTelegramService
    ) {}

    @Post('/sign-in')
    public async signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto): Promise<AuthSignInDto> {
        return this.authCredentialsService.signIn(authCredentialDto);
    }
    @Post('/sign-up')
    public async signUp(@Body(ValidationPipe) authCredentialDto: AuthSignUpDto): Promise<AuthSignInDto> {
        return this.authCredentialsService.signUp(authCredentialDto);
    }
    @Post('/telegram-sign-in')
    public async telegramSignIn(@Body(ValidationPipe) authCredentialDto: AuthTelegramSignInDto): Promise<AuthSignInDto> {
        return this.authTelegramService.signIn(authCredentialDto);
    }
    @Post('/telegram-sign-up')
    public async telegramSignUp(@Body(ValidationPipe) authCredentialDto: AuthTelegramSignUpDto): Promise<AuthSignInDto> {
        return this.authTelegramService.signUp(authCredentialDto);
    }
}
