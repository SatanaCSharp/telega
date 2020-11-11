import { Module } from '@nestjs/common';
import { ADVERTISING_PROVIDERS_MAPPER, ADVERTISING_PROVIDERS_REPOSITORY } from '../common/di.constants';
import { AdvertisingProvidersMapper } from './advertising-providers.mapper';
import { AdvertisingProvidersRepository } from './advertising-providers.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdvertisingProvider } from './advertising-providers.model';

@Module({
    imports: [
        SequelizeModule.forFeature([AdvertisingProvider]),
    ],
    providers: [
        {
            provide: ADVERTISING_PROVIDERS_MAPPER,
            useClass: AdvertisingProvidersMapper,
        },
        {
            provide: ADVERTISING_PROVIDERS_REPOSITORY,
            useClass: AdvertisingProvidersRepository,
        },
    ],
    exports: [
        {
            provide: ADVERTISING_PROVIDERS_MAPPER,
            useClass: AdvertisingProvidersMapper,
        },
        {
            provide: ADVERTISING_PROVIDERS_REPOSITORY,
            useClass: AdvertisingProvidersRepository,
        },
    ]
})
export class AdvertisingProvidersModule {
}
