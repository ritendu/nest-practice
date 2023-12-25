import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AdminAuthService } from './admin-auth-service';
import { TokenService } from 'src/utils/token.service';
import { AdminForgetPassword, AdminResetPassword } from './dtos/admin.dto';
import * as messages from '../../../messages.json'

@Controller('admin')
export class AdminAuthController {
  constructor(
    private adminAuthService: AdminAuthService,
    private tokenService: TokenService,
  ) {}

  @Post('/login')
  async adminLogin(@Body() body, @Req() req, @Res() res) {
    const user = await this.adminAuthService.adminLogin(body);
    const tokens = await this.tokenService.generateAuthTokens(user);

    return res.status(HttpStatus.OK).send({
      serverResponse: {
        message: messages.ADMIN.ADMIN_LOGIN_SUCCESS,
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

  @Post('/forget-password')
  async adminForgetPassword(
    @Body() body: AdminForgetPassword,
    @Req() req,
    @Res() res,
  ) {
    const data = await this.adminAuthService.forgetPassword(body);
    return res.status(HttpStatus.OK).send({
      serverResponse: {
        message: 'OTP Successfully sent.',
      },
    });
  }

  @Post('/reset-password')
  async resetPassword(@Body() body: AdminResetPassword, @Res() res) {
    const data = await this.adminAuthService.resetPassword(body);
    return res.status(HttpStatus.OK).send({
      serverResponse: {
        message: 'Password has been reset',
      },
      result: {
        data,
      },
    });
  }
}
