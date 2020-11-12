import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../common/base.repository';
import { IChannelOwnersRepository } from './interfaces/ichannel-ownerss.repository';
import { IChannelOwner } from './interfaces/ichannel-owner';
import { InjectModel } from '@nestjs/sequelize';
import { ChannelOwner } from './channel-owners.model';
import { CreateChannelOwnersDto } from './dto/create-channel-owners.dto';
import { UpdateChannelOwnersDto } from './dto/update-channel-owners.dto';


@Injectable()
export class ChannelOwnersRepository extends BaseRepository<IChannelOwner,
    CreateChannelOwnersDto,
    UpdateChannelOwnersDto> implements IChannelOwnersRepository {
    constructor(
        @InjectModel(ChannelOwner) private channelOwnerModel: typeof ChannelOwner,
    ) {
        super(channelOwnerModel);
    }

    public findByUserId = async (UserId: number): Promise<IChannelOwner | null> => {
        return this.channelOwnerModel.findOne({ where: { UserId } });
    };
}
