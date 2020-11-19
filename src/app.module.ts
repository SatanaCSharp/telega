import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { mySqlConfig } from './common/config/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChannelsModule } from './channels/channels.module';
import { AdvertisementsModule } from './advertisements/advertisements.module';
import { DealsModule } from './deals/deals.module';

@Module({
  imports: [
      SequelizeModule.forRoot(mySqlConfig),
      UsersModule,
      AuthModule,
      ChannelsModule,
      AdvertisementsModule,
      DealsModule
  ],
})
export class AppModule {}
