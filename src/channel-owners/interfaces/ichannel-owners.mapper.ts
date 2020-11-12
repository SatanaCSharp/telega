import { DBEntitiesToDtoMapper, DBEntityToDtoMapper } from '../../common/base.interfaces/db-entity.mapper';
import { IChannelOwner } from './ichannel-owner';
import { ChannelOwnersDto } from '../dto/channel-owners.dto';

export interface IChannelOwnersMapper extends DBEntitiesToDtoMapper<IChannelOwner, ChannelOwnersDto>,
    DBEntityToDtoMapper<IChannelOwner, ChannelOwnersDto> {}
