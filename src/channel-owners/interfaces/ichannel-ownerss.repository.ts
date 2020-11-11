import { CreateDbEntityRepository, FindDbEntitiesRepository, FindDbEntityRepository } from '../../common/base.interfaces/ibase.repository';
import { IChannelOwner } from './ichannel-owner';
import { CreateAdvertisingProvidersDto } from '../../advertising-providers/dto/create-advertising-providers.dto';

export interface IChannelOwnersRepository extends FindDbEntitiesRepository<IChannelOwner>,
    FindDbEntityRepository<IChannelOwner>,
    CreateDbEntityRepository<CreateAdvertisingProvidersDto, IChannelOwner> {
    findByUserId(UserId: number): Promise<IChannelOwner | null>;
}
