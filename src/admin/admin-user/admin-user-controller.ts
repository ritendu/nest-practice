import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/enum/roles.enum';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
// import { Roles } from "src/guard/roles.guard";
import { UserDto } from 'src/users/dtos/user.dto';
import { Roles } from 'src/decorator/role.decorator';
import { UserService } from 'src/users/user.service';
import { AdminService } from './admin-user-service';
import { TokenService } from 'src/utils/token.service';
@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private tokenService: TokenService,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/register')
  async postData(@Body() body: UserDto, @Req() req, @Res() res) {

    const user = await this.adminService.createUser(body);
    return res.status(HttpStatus.CREATED).send({
      serverResponse: {
        message: 'Success',
      },
      result: {
        data: user,
      },
    });
  }


}
