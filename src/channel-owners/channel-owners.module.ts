import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChannelOwner } from './channel-owners.model';

@Module({
    imports: [
        SequelizeModule.forFeature([ChannelOwner]),
    ],
})
export class ChannelOwnersModule {}
