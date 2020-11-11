import { IChannelOwnersMapper } from './interfaces/ichannel-owners.mapper';
import { ChannelOwnersDto } from './dto/channel-owners.dto';
import { IChannelOwner } from './interfaces/ichannel-owner';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChannelOwnersMapper implements IChannelOwnersMapper {
    mapToDto(dbEntity: IChannelOwner): ChannelOwnersDto {
        return new ChannelOwnersDto(dbEntity);
    }
    mapToDtos(dbEntities: IChannelOwner[]): ChannelOwnersDto[] {
        return dbEntities.map((channelOwner) => new ChannelOwnersDto(channelOwner));
    }
}
