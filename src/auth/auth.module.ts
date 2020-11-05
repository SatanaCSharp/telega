import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { SECRET_KEY } from '../common/config/auth.config';
import { JwtStrategy } from './jwt.strategy';
import { AuthValidatorService } from './auth-validator.service';
import { AUTH_SERVICE, AUTH_VALIDATOR_SERVICE } from '../common/di.constants';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: SECRET_KEY,
            signOptions: { expiresIn: '3 days' },
        }),
        UsersModule,
    ],
    controllers: [AuthController],
    providers: [
        JwtStrategy,
        {
            provide: AUTH_SERVICE,
            useClass: AuthService
        },
        {
            provide: AUTH_VALIDATOR_SERVICE,
            useClass: AuthValidatorService
        }
    ],
})
export class AuthModule {
}
