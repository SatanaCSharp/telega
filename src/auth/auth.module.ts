import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthCredentialsService } from './auth-credentials.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { SECRET_KEY } from '../common/config/auth.config';
import { JwtStrategy } from './jwt.strategy';
import { AuthValidatorService } from './auth-validator.service';
import { AUTH_CREDENTIALS_SERVICE, AUTH_TELEGRAM_SERVICE, AUTH_VALIDATOR_SERVICE } from '../common/di.constants';
import { TelegramUsersModule } from '../telegram-users/telegram-users.module';
import { AuthTelegramService } from './auth-telegram.service';
import { AdvertisingProvidersModule } from '../advertising-providers/advertising-providers.module';
import { ChannelOwnersModule } from '../channel-owners/channel-owners.module';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: SECRET_KEY,
            signOptions: { expiresIn: '3 days' },
        }),
        UsersModule,
        TelegramUsersModule,
        AdvertisingProvidersModule,
        ChannelOwnersModule,
    ],
    controllers: [AuthController],
    providers: [
        JwtStrategy,
        {
            provide: AUTH_CREDENTIALS_SERVICE,
            useClass: AuthCredentialsService
        },
        {
            provide: AUTH_TELEGRAM_SERVICE,
            useClass: AuthTelegramService
        },
        {
            provide: AUTH_VALIDATOR_SERVICE,
            useClass: AuthValidatorService
        }
    ],
})
export class AuthModule {
}
