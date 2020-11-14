import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-creadential.dto';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { AuthTelegramSignInDto } from './dto/auth-telegram-sign-in.dto';
import { AuthTelegramSignUpDto } from './dto/auth-telegram-sign-up.dto';
import { AuthCredentialsService } from './auth-credentials.service';
import { AuthTelegramService } from './auth-telegram.service';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AuthCredentialsService) private authCredentialsService: AuthCredentialsService,
        @Inject(AuthTelegramService) private authTelegramService: AuthTelegramService
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
