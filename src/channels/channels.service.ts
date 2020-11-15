import { Injectable } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { ChannelsDto } from './dto/channels.dto';
import { IChannel } from './interfaces/ichannel';
import { InjectModel } from '@nestjs/sequelize';
import { Channel } from './channels.model';
import { ChannelOwner } from '../channel-owners/channel-owners.model';

@Injectable()
export class ChannelsService extends BaseService<ChannelsDto, IChannel> {
    constructor(
        @InjectModel(Channel) private channelModel: typeof Channel,
        @InjectModel(ChannelOwner) private channelOwnerModel: typeof ChannelOwner,
    ) {
        super(channelModel);
    }

    getAuthUserChannels = async (UserId: number): Promise<IChannel[]> => {
        const channelOwner = await this.channelOwnerModel.findOne({ where: { UserId }});
        const ChannelOwnerId = channelOwner.id;
        return this.channelModel.findAll({where: {ChannelOwnerId}});
    }

    createChannels = async (UserId: number, dtos: ChannelsDto[]): Promise<IChannel[]> => {
        const channelOwner = await this.channelOwnerModel.findOne({ where: { UserId }});
        const ChannelOwnerId = channelOwner.id;
        const channelDtos: ChannelsDto[] = dtos.map((channelDto) => ({ ...channelDto, ChannelOwnerId }));
        return this.createMany(channelDtos);
    }
}
