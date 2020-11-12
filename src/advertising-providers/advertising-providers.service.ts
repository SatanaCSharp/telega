import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { IAdvertisingProvidersService } from './interfaces/iadvertising-providers.service';
import { IAdvertisingProvider } from './interfaces/iadvertising-provider';
import { CreateAdvertisingProvidersDto } from './dto/create-advertising-providers.dto';
import { UpdateAdvertisingProvidersDto } from './dto/update-advertising-providers.dto';
import { AdvertisingProvidersDto } from './dto/advertising-providers.dto';
import { IAdvertisingProvidersRepository } from './interfaces/iadvertising-providers.repository';
import { IAdvertisingProvidersMapper } from './interfaces/iadvertising-providers.mapper';

@Injectable()
export class AdvertisingProvidersService extends BaseService<
    IAdvertisingProvider,
    CreateAdvertisingProvidersDto,
    UpdateAdvertisingProvidersDto,
    AdvertisingProvidersDto,
    IAdvertisingProvidersRepository,
    IAdvertisingProvidersMapper> implements IAdvertisingProvidersService {
    constructor(
        @Inject() private advertisingProvidersRepository: IAdvertisingProvidersRepository,
        @Inject() private advertisingProvidersMapper: IAdvertisingProvidersMapper
    ) {
        super(advertisingProvidersRepository, advertisingProvidersMapper);
    }

}
