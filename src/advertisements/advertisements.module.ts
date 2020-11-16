import { Module } from '@nestjs/common';
import { AdvertisementsController } from './advertisements.controller';
import { AdvertisementsService } from './advertisements.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Advertisement } from './advertisements.model';
import { AdvertisingProvider } from '../advertising-providers/advertising-providers.model';

@Module({
  imports: [
      SequelizeModule.forFeature([Advertisement, AdvertisingProvider])
  ],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService]
})
export class AdvertisementsModule {}
