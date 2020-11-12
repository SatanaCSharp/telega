import { BaseRepository } from '../common/base.repository';
import { IAdvertisingProvider } from './interfaces/iadvertising-provider';
import { CreateAdvertisingProvidersDto } from './dto/create-advertising-providers.dto';
import { UpdateAdvertisingProvidersDto } from './dto/update-advertising-providers.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AdvertisingProvider } from './advertising-providers.model';
import { IAdvertisingProvidersRepository } from './interfaces/iadvertising-providers.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdvertisingProvidersRepository extends BaseRepository<IAdvertisingProvider,
    CreateAdvertisingProvidersDto,
    UpdateAdvertisingProvidersDto> implements IAdvertisingProvidersRepository {
    constructor(@InjectModel(AdvertisingProvider) private advertisingProviderModel: typeof AdvertisingProvider) {
        super(advertisingProviderModel);
    }

    findByUserId(UserId: number): Promise<IAdvertisingProvider | null> {
        return this.advertisingProviderModel.findOne({ where: { UserId } });
    }
}
