import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
// app.use(ConfigModule.forRoot({
//   isGlobal: true,
// })
// )
  // Attaching validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true,
    forbidNonWhitelisted: true
  }))

  await app.listen(3000);
}
bootstrap();
