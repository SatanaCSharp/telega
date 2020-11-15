import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { mySqlConfig } from './common/config/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChannelsModule } from './channels/channels.module';

@Module({
  imports: [
      SequelizeModule.forRoot(mySqlConfig),
      UsersModule,
      AuthModule,
      ChannelsModule
  ],
})
export class AppModule {}
