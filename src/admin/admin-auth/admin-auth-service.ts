import { BadRequestException, Injectable } from "@nestjs/common";
import { AdminLoginDto } from "../admin-user/dtos/admin.dto";
import { userDocument } from "src/schemas/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { comparePassword } from "src/utils/bcrpt";

@Injectable()
export class AdminAuthService{
constructor(@InjectModel('User') private readonly userModel: Model<userDocument>,){}

    async adminLogin(data: AdminLoginDto) {
        const findUser: { email: string; password: string,role:string } =
          await this.userModel.findOne({ email: data.email });
        if (findUser.role==="admin") {
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