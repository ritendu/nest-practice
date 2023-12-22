import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword, comparePassword } from 'src/utils/bcrpt';
import { userDocument } from 'src/schemas/user.schema';
import { UserDto } from 'src/users/dtos/user.dto';
import { AdminLoginDto } from '../admin-auth/dtos/admin.dto';
import { passwordGenerator } from 'src/utils/otp-generator';
@Injectable()
export class AdminService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<userDocument>,
  ) {}

  async createUser(data: UserDto) {
    const findUser = await this.userModel.findOne({ email: data.email });
    if (findUser) {
      throw new BadRequestException('User with this email already exists');
    } else {
      const userpassword = passwordGenerator();
      const password = await hashPassword(userpassword);
      if (password) {
        const createUser = await this.userModel.create({
          name: data.name,
          email: data.email,
          password: password,
        });
        return createUser;
      }
    }
  }

  async adminLogin(data: AdminLoginDto) {
    const findUser: { email: string; password: string } =
      await this.userModel.findOne({ email: data.email });
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
}
