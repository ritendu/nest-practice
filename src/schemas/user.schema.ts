import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';



export type userDocument = HydratedDocument<User>

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

}


export const userSchema = SchemaFactory.createForClass(User);

userSchema.methods.toJSON = function () {
    let userObject = this.toObject();
    delete userObject.password;
    return userObject;
  };