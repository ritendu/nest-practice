import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory{
constructor(private configService:ConfigService){

}

createMongooseOptions(): MongooseModuleOptions {
    console.log("MongoDB connection successful.")
    const mongoose_url = this.configService.get<string>('MONGODB_URL')
    
    return {
      uri: mongoose_url
    };
  }

} 