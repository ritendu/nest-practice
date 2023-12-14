import { Body, Controller, Get, HttpException, HttpStatus, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { loginDto } from './dtos/login.dto';


@Controller("users")
export class UserController {
  constructor(private readonly userService:UserService) {}

  @Get()
  getHello(): string {
    return "Hello"
  }

  @Post("/register")
  @UsePipes(new ValidationPipe())
 async postData(@Body()body:UserDto, @Res()res){
  const data =  await this.userService.createUser(body);
  res.send({
    data:data
  })
  }

  @Post("/login")
  @UsePipes(new ValidationPipe())
 async userLogin(@Body()body:loginDto, @Res()res){
  const data = await this.userService.login(body)
  console.log(data,"data")
  res.send({
    data:data
  })
  }
}
