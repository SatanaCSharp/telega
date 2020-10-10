import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-creadential.dto';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { AUTH_SERVICE } from '../common/constants/services.constants';
import { IAuthService } from './interfaces/iauth.service';

@Controller('auth')
export class AuthController {
    constructor(@Inject(AUTH_SERVICE) private authService: IAuthService) {}

    @Post('/sign-in')
    public async signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto): Promise<AuthSignInDto> {
        return this.authService.signIn(authCredentialDto);
    }
}
