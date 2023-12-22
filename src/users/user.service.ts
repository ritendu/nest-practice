import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword, comparePassword } from 'src/utils/bcrpt';
import { User, userDocument } from 'src/schemas/user.schema';

import { loginDto } from './dtos/login.dto';
import { passwordGenerator } from 'src/utils/otp-generator';
import { EmailService } from 'src/utils/email.service';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<userDocument>,
    private emailService: EmailService,
  ) {}

  async login(data: loginDto) {
    const findUser: { email: string; password: string } =
      await this.userModel.findOne({
        email: data.email,
        role: { $ne: 'admin' },
      });
    if (findUser) {
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

  async forgetPassword(data) {
    let findUser = await this.userModel.findOne({
      email: data.email,
      role: { $ne: 'admin' },
    });
    if (findUser) {
      const generatePassword = await passwordGenerator();
      console.log(generatePassword, 'generatePassword');
      const password = await hashPassword(generatePassword);
      const sendOTP = await this.emailService.userSendPassword(
        data.email,
        password,
      );
      if (sendOTP) {
        findUser.password = password;

        await findUser.save();
        return true;
      } else {
        throw new BadRequestException('Email cannot be sent');
      }
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async changePassword(userData, data) {
    let findUser = await this.userModel.findOne({ _id: userData.userId });
    const checkPassword = await comparePassword(
      data.password,
      findUser.password,
    );
    if (findUser) {
      if (checkPassword) {
        const password = await hashPassword(data.newPassword);
        findUser.password = password;
        findUser = await findUser.save();
        return findUser;
      } else {
        throw new BadRequestException('Passwords does not match');
      }
    } else {
      throw new NotFoundException('Users not found exception');
    }
  }
}
