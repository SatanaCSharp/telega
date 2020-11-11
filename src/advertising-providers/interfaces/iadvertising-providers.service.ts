import { CreatableService, FindableService, SingleFindableService } from '../../common/base.interfaces/ibase.service';
import { AdvertisingProvidersDto } from '../dto/advertising-providers.dto';
import { CreateAdvertisingProvidersDto } from '../dto/create-advertising-providers.dto';


export interface IAdvertisingProvidersService extends FindableService<AdvertisingProvidersDto>,
    SingleFindableService<AdvertisingProvidersDto>,
    CreatableService<CreateAdvertisingProvidersDto, AdvertisingProvidersDto> {}
