import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '../roles/roles.model';
import { Permission } from '../roles/permissions.model';
import { User } from './users.model';
import { UserRole } from '../user-roles/user-roles.model';
import { USERS_REPOSITORY } from '../common/constants/repositories.constants';
import { USERS_SERVICE } from '../common/constants/services.constants';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UserRolesModule } from '../user-roles/user-roles.module';
import { USERS_MAPPER } from '../common/constants/mappers.constants';
import { UsersMapper } from './users.mapper';
import { UsersController } from './users.controller';
import { VacationBalancesModule } from '../vacation-balances/vacation-balances.module';
import { VacationBalance } from '../vacation-balances/vacation-balances.model';

@Module({
    imports: [
        SequelizeModule.forFeature([Role, Permission, User, UserRole, VacationBalance]),
        UserRolesModule,
        VacationBalancesModule
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
