import { Body, Controller, Get, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';


@Controller("users")
export class UserController {
  constructor(private readonly userService:UserService) {}

  @Get()
  getHello(): string {
    return "Hello"
  }

  @Post("/post")
  @UsePipes(new ValidationPipe())
 async postData(@Body()body:UserDto ){
  return this.userService.createUser(body)
  }
}
