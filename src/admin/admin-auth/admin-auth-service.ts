import { BadRequestException, Injectable } from '@nestjs/common';
import {
  AdminForgetPassword,
  AdminLoginDto,
  AdminResetPassword,
} from './dtos/admin.dto';
import { userDocument } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { comparePassword } from 'src/utils/bcrpt';
import { EmailService } from 'src/utils/email.service';
import { otpGeneratorFunction } from 'src/utils/otp-generator';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<userDocument>,
    private emailService: EmailService,
  ) {}

  async adminLogin(data: AdminLoginDto) {
    const findUser: { email: string; password: string; role: string } =
      await this.userModel.findOne({ email: data.email });
    if (findUser.role === 'admin') {
      const checked = await comparePassword(data.password, findUser.password);
      if (checked) {
        return findUser;
      } else {
        throw new BadRequestException('Password does not match');
      }
    } else {
      throw new BadRequestException('No such user found');
    }
  }

  async forgetPassword(data: AdminForgetPassword) {
    const otp = otpGeneratorFunction();
    let findUser:any = await this.userModel.findOne({
      email: data.email,
      // role: { $eq: 'admin' },
    });
   if(findUser){
    console.log(findUser,"findUser")
    const forgetPassword:any = await this.emailService.adminsendOTP(data.email, otp);
    
    if(forgetPassword==="Unauthorized"){
     throw new BadRequestException("Something went wrong")
    }
    else{
      const date = new Date().toISOString()
      findUser.otp.expires = 1234999
      findUser.otp.otp = 12345
      await findUser.save()
      return true;
    }
 
   }
   else{
    throw new BadRequestException("No User Found")
   }
  
  }

  async resetPassword(data: AdminResetPassword) {
    
  }
}
