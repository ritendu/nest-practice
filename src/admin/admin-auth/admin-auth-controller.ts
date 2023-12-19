import { Body, Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { AdminAuthService } from "./admin-auth-service";
import { TokenService } from "src/utils/token.service";

@Controller('admin')
export class AdminAuthController{
    constructor(private adminAuthService:AdminAuthService,private tokenService:TokenService){}

@Post('/login')
async adminLogin(@Body() body, @Req() req, @Res() res) {
    const user = await this.adminAuthService.adminLogin(body);
    const tokens = await this.tokenService.generateAuthTokens(user);

    return res.status(HttpStatus.OK).send({
      serverResponse: {
        message: 'Success',
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