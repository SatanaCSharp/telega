import { DBEntitiesToDtoMapper, DBEntityToDtoMapper } from '../../common/base.interfaces/db-entity.mapper';
import { IAdvertisingProvider } from './iadvertising-provider';
import { AdvertisingProvidersDto } from '../dto/advertising-providers.dto';

export interface IAdvertisingProvidersMapper extends DBEntitiesToDtoMapper<IAdvertisingProvider, AdvertisingProvidersDto>,
    DBEntityToDtoMapper<IAdvertisingProvider, AdvertisingProvidersDto> {}
