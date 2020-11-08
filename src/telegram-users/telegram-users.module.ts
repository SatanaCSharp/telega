import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { TELEGRAM_USERS_MAPPER, TELEGRAM_USERS_REPOSITORY } from '../common/di.constants';
import { TelegramUsersRepository } from './telegram-users.repository';
import { TelegramUsersMapper } from './telegram-users.mapper';

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
    ],
    providers: [
        {
            provide: TELEGRAM_USERS_REPOSITORY,
            useClass: TelegramUsersRepository,
        },
        {
            provide: TELEGRAM_USERS_MAPPER,
            useClass: TelegramUsersMapper,
        },
    ],
    exports: [
        {
            provide: TELEGRAM_USERS_REPOSITORY,
            useClass: TelegramUsersRepository,
        },
        {
            provide: TELEGRAM_USERS_MAPPER,
            useClass: TelegramUsersMapper,
        },
    ]
})
export class TelegramUsersModule {}
