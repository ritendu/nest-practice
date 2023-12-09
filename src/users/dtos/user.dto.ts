import { IsDefined, IsEmail, IsString, Matches, MinLength, Validate } from "class-validator";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'containsUppercase', async: false })
export class ContainsUppercaseConstraint implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return /[A-Z]/.test(text); // Check if string contains at least one uppercase letter
  }

  defaultMessage(args: ValidationArguments) {
    return 'The password must contain at least one uppercase letter';
  }
}

export class UserDto{
 @IsEmail()
 @IsDefined()
 email:string
 
 @IsString()
 name:string

 @IsString()
 @MinLength(8)
@Validate(ContainsUppercaseConstraint)
 password:string
}

