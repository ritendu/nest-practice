import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDto, UserDtoChangePassword, UserDtoForgetPassword } from './dtos/user.dto';
import { UserService } from './user.service';
import { loginDto } from './dtos/login.dto';
import { TokenService } from 'src/utils/token.service';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/roles.enum';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';


@Controller("users")
export class UserController {
  constructor(private readonly userService:UserService,private readonly tokenService:TokenService) {}

  @Post("/login")
  @UsePipes(new ValidationPipe())
 async userLogin(@Body()body:loginDto, @Res()res){
  const user = await this.userService.login(body);
  const tokens = await this.tokenService.generateAuthTokens(user)
  
  return res.status(HttpStatus.OK).send({
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

  @Post("/forget-password")
  async userForgetPassword(@Body() body:UserDtoForgetPassword, @Res()res){
const data = await this.userService.forgetPassword(body);
return res.status(HttpStatus.OK).send({
  serverResponse: {
    message:"Success"
  },
});
  }

  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  @Post("/change-password")
  async changePassword(@Body() body:UserDtoChangePassword,@Res() res ,@Req()req){

  const data = await this.userService.changePassword(req.user, body)
  return res.status(HttpStatus.OK).send({
    serverResponse: {
      message:"Success"
    },
    result: {
      data: data,
  
    },
  });
  }

}
