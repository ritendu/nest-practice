import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './database/mongoose.config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass:MongooseConfigService
    })
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URL'),
    //   }),
    //   inject: [ConfigService],
    // }),
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
