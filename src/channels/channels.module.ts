import { Module } from '@nestjs/common';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Channel } from './channels.model';
import { ChannelOwner } from '../channel-owners/channel-owners.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Channel, ChannelOwner])
  ],
  controllers: [ChannelsController],
  providers: [ChannelsService]
})
export class ChannelsModule {}
