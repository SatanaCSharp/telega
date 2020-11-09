import { Module } from '@nestjs/common';
import { AdvertisingProvidersService } from './advertising-providers.service';
import { AdvertisingProvidersController } from './advertising-providers.controller';

@Module({
  providers: [AdvertisingProvidersService],
  controllers: [AdvertisingProvidersController]
})
export class AdvertisingProvidersModule {}
