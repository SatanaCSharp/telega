import { CreateDbEntityRepository, FindDbEntitiesRepository, FindDbEntityRepository } from '../../common/base.interfaces/ibase.repository';
import { CreateAdvertisingProvidersDto } from '../dto/create-advertising-providers.dto';
import { IAdvertisingProvider } from './iadvertising-provider';

export interface IAdvertisingProvidersRepository extends   FindDbEntitiesRepository<IAdvertisingProvider>,
    FindDbEntityRepository<IAdvertisingProvider>,
    CreateDbEntityRepository<CreateAdvertisingProvidersDto, IAdvertisingProvider> {
    findByUserId(UserId: number): Promise<IAdvertisingProvider | null>;
}
