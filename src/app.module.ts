import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { mySqlConfig } from '../../ems/src/utils/config/database.config';
import { AuthModule } from '../../ems/src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot(mySqlConfig),
    AuthModule,
  ],
})
export class AppModule {}
