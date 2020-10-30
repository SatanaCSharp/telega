import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { mySqlConfig } from './common/config/database.config';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import {join} from 'path';
@Module({
  imports: [
      ServeStaticModule.forRoot({
          rootPath: join(__dirname, '..', 'client', 'build'),
          exclude: ['/api*'],
      }),
      SequelizeModule.forRoot(mySqlConfig),
      AuthModule,
  ],
})
export class AppModule {}
