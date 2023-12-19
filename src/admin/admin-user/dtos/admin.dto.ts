import { IsDefined, IsEmail, IsString, Matches, MinLength, Validate } from "class-validator";

export class AdminLoginDto{
@IsEmail()
email:string    

@IsString()
password:string

}