import { Module } from '@nestjs/common';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Deal } from './deals.model';
import { ChannelOwner } from '../channel-owners/channel-owners.model';
import { AdvertisingProvider } from '../advertising-providers/advertising-providers.model';
import { Channel } from '../channels/channels.model';

@Module({
    imports: [SequelizeModule.forFeature([Deal, ChannelOwner, AdvertisingProvider, Channel])],
    controllers: [DealsController],
    providers: [DealsService],
})
export class DealsModule {
}
