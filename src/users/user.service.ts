import { Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { userScheama } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>){

  }
    getHello(): string {
        return 'Hello World!';
      }

   async createUser(data:UserDto){
const createUser = await this.userModel.create(data)
console.log(createUser,"createUser")
   }  
}
