import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpExceptionFilter } from './utils/exception.handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true,
    forbidNonWhitelisted: true
  }))
app.useGlobalFilters(new HttpExceptionFilter)
  await app.listen(3000);
}
bootstrap();
