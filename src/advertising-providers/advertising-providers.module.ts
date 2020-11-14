import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdvertisingProvider } from './advertising-providers.model';

@Module({
    imports: [
        SequelizeModule.forFeature([AdvertisingProvider]),
    ],
    providers: [],
    exports: []
})
export class AdvertisingProvidersModule {
}
