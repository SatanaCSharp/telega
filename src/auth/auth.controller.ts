import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-creadential.dto';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { IAuthService } from './interfaces/iauth.service';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { AUTH_SERVICE } from '../common/di.constants';

@Controller('auth')
export class AuthController {
    constructor(@Inject(AUTH_SERVICE) private authService: IAuthService) {}

    @Post('/sign-in')
    public async signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto): Promise<AuthSignInDto> {
        return this.authService.signIn(authCredentialDto);
    }
    @Post('/sign-up')
    public async signUp(@Body(ValidationPipe) authCredentialDto: AuthSignUpDto): Promise<AuthSignInDto> {
        return this.authService.signUp(authCredentialDto);
    }
}
