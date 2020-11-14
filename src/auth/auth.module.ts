import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthCredentialsService } from './auth-credentials.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { SECRET_KEY } from '../common/config/auth.config';
import { JwtStrategy } from './jwt.strategy';
import { AuthValidatorService } from './auth-validator.service';
import { AuthTelegramService } from './auth-telegram.service';
import { AdvertisingProvidersModule } from '../advertising-providers/advertising-providers.module';
import { ChannelOwnersModule } from '../channel-owners/channel-owners.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { AdvertisingProvider } from '../advertising-providers/advertising-providers.model';
import { ChannelOwner } from '../channel-owners/channel-owners.model';

@Module({
    imports: [
        SequelizeModule.forFeature([User, AdvertisingProvider, ChannelOwner]),
        PassportModule,
        JwtModule.register({
            secret: SECRET_KEY,
            signOptions: { expiresIn: '3 days' },
        }),
        UsersModule,
        AdvertisingProvidersModule,
        ChannelOwnersModule,
    ],
    controllers: [AuthController],
    providers: [
        JwtStrategy,
        AuthValidatorService,
        AuthCredentialsService,
        AuthTelegramService,
    ],
})
export class AuthModule {
}
