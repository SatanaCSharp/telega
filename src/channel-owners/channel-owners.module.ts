import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChannelOwner } from './channel-owners.model';
import { CHANNEL_OWNERS_MAPPER, CHANNEL_OWNERS_REPOSITORY } from '../common/di.constants';
import { ChannelOwnersMapper } from './channel-owners.mapper';
import { ChannelOwnersRepository } from './channel-owners.repository';

@Module({
    imports: [
        SequelizeModule.forFeature([ChannelOwner]),
    ],
    providers: [
        {
            provide: CHANNEL_OWNERS_MAPPER,
            useClass: ChannelOwnersMapper
        },
        {
            provide: CHANNEL_OWNERS_REPOSITORY,
            useClass: ChannelOwnersRepository
        }
    ],
    exports: [
        {
            provide: CHANNEL_OWNERS_MAPPER,
            useClass: ChannelOwnersMapper
        },
        {
            provide: CHANNEL_OWNERS_REPOSITORY,
            useClass: ChannelOwnersRepository
        },
    ]
})
export class ChannelOwnersModule {}
