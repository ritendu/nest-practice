import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { userScheama } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { hashPassword,comparePassword } from 'src/utils/bcrpt';

import { loginDto } from './dtos/login.dto';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>){

  }


   async createUser(data:UserDto){
      console.log(data,"data")
      const findUser = await this.userModel.findOne({email:data.email});
      if(findUser){
         throw new BadRequestException('User with this email already exists');

      }
      else{
         const password = await hashPassword(data.password)
         if(password){
            const createUser = await this.userModel.create(
               {
                  name:data.name,
                  email:data.email,
                  password:password
               }
            )
            return createUser
         }
         
      }


   }
   
   async login(data:loginDto){
      const findUser:{email:string,password:string} = await this.userModel.findOne({email:data.email});
      if(findUser){
const checked = await comparePassword(data.password,findUser.password)
if(checked){
   return findUser
}
else{
   throw new BadRequestException('Password does not match');
}
      }
      else{
         throw new BadRequestException('No such user found');
      }
   }
}
