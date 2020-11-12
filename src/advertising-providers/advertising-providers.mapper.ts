import { IAdvertisingProvidersMapper } from './interfaces/iadvertising-providers.mapper';
import { IAdvertisingProvider } from './interfaces/iadvertising-provider';
import { AdvertisingProvidersDto } from './dto/advertising-providers.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdvertisingProvidersMapper implements IAdvertisingProvidersMapper {
    mapToDto(dbEntity: IAdvertisingProvider): AdvertisingProvidersDto {
        return new AdvertisingProvidersDto(dbEntity);
    }

    mapToDtos(dbEntities: IAdvertisingProvider[]): AdvertisingProvidersDto[] {
        return dbEntities.map((advertisingProvider) => new AdvertisingProvidersDto(advertisingProvider));
    }

}


