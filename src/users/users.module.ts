import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersMapper } from './users.mapper';
import { UsersController } from './users.controller';
import { USERS_MAPPER, USERS_REPOSITORY, USERS_SERVICE } from '../common/di.constants';


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
