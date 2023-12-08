import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { userScheama } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>){

  }


   async createUser(data:UserDto){
      const findUser = await this.userModel.findOne({email:data.email});
      if(findUser){
         throw new BadRequestException('User with this email already exists');

      }
      else{
         const createUser = await this.userModel.create(data)
         return createUser
      }


   }  
}
