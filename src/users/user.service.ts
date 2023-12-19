import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword,comparePassword } from 'src/utils/bcrpt';
import { userDocument } from 'src/schemas/user.schema';

import { loginDto } from './dtos/login.dto';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<userDocument>){

  }
   
   async login(data:loginDto){
      const findUser:{email:string,password:string} = await this.userModel.findOne({email:data.email,role:{$ne:'admin'}});
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
