import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { Role } from "src/enum/roles.enum";
import { AuthGuard } from "src/guard/auth.guard";
import { RolesGuard } from "src/guard/roles.guard";
// import { Roles } from "src/guard/roles.guard";
import { UserDto } from "src/users/dtos/user.dto";
import { Roles } from "src/decorator/role.decorator";
@Controller("admin")
export class AdminController {
  constructor() {}

@Roles(Role.Admin)
@UseGuards(AuthGuard)
@UseGuards(RolesGuard)
@Post("/register")
 async postData(@Body()body:UserDto, @Res()res){
console.log("Inside the controller")
  }



 
}