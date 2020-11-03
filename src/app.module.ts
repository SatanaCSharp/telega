import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { mySqlConfig } from './common/config/database.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      SequelizeModule.forRoot(mySqlConfig),
      AuthModule,
  ],
})
export class AppModule {}
