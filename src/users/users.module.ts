import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { USERS_REPOSITORY } from '../common/constants/repositories.constants';
import { USERS_SERVICE } from '../common/constants/services.constants';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { USERS_MAPPER } from '../common/constants/mappers.constants';
import { UsersMapper } from './users.mapper';
import { UsersController } from './users.controller';

@Module({
    imports: [
        SequelizeModule.forFeature([User]),
    ],
    controllers: [UsersController],
    providers: [
        {
            provide: USERS_REPOSITORY,
            useClass: UsersRepository,
        },
        {
            provide: USERS_MAPPER,
            useClass: UsersMapper,
        },
        {
            provide: USERS_SERVICE,
            useClass: UsersService,
        },
    ],
    exports: [
        {
            provide: USERS_REPOSITORY,
            useClass: UsersRepository,
        },
        {
            provide: USERS_MAPPER,
            useClass: UsersMapper,
        },
    ]
})
export class UsersModule {
}
