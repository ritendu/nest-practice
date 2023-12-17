import { Body, Controller, Get, HttpException, HttpStatus, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';
import { loginDto } from './dtos/login.dto';
import { TokenService } from 'src/utils/token.service';


@Controller("users")
export class UserController {
  constructor(private readonly userService:UserService,private readonly tokenService:TokenService) {}

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
  const user = await this.userService.login(body);
  const tokens = await this.tokenService.generateAuthTokens(user)
  
  return res.status(201).send({
    serverResponse: {
      message:"Success"
    },
    result: {
      data: user,
      tokens: {
        accessToken: tokens.access.token,
        refreshToken: tokens.refresh.token,
      },
    },
  });
  }
}
