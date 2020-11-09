import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { mySqlConfig } from './common/config/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdvertisingProvidersModule } from './advertising-providers/advertising-providers.module';

@Module({
  imports: [
      SequelizeModule.forRoot(mySqlConfig),
      UsersModule,
      AuthModule,
      AdvertisingProvidersModule,
  ],
})
export class AppModule {}
