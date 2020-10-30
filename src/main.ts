import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
const PORT: number = Number(process.env.PORT) || 5000;
const PREFIX = process.env.PREFIX || '/api/v1';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix(PREFIX);
  app.enableCors();
  await app.listen(PORT);
}

bootstrap();
console.log('Server is up and running http://localhost:5000/api/v1');
