import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


interface OTP {
    expires:string;
    otp:string;
}
export type userDocument = HydratedDocument<User>
@Schema({ _id: false })
export class Otp {
  @Prop({default:""})
  expires: string;

  @Prop({default:""})
  otp: string;
}
@Schema({timestamps:true})
export class User{
@Prop({default:""})
name:string;
@Prop({required:true})
email:string;

@Prop({required:true})
password:string;

@Prop({default:'user'})
role:string;

@Prop({type:Otp,default:{expires:"",otp:""}})
otp:Otp
}


export const userSchema = SchemaFactory.createForClass(User);

userSchema.set("toJSON", {
  transform: (doc, ret, opt) => {
    delete ret.password;
    delete ret.otp;
    return ret;
  },
});

