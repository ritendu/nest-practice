import {
  IsDefined,
  IsEmail,
  IsString,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';

export class AdminLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class AdminForgetPassword {
  @IsEmail()
  email: string;
}

export class AdminResetPassword{
    @IsEmail()
    email:string;
    @IsString()
    otp:string;
    @IsString()
    password:string
}
