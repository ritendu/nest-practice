import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
//   import { jwtConstants } from './constants';
  import { Request } from 'express';
import { ROLES_KEY } from 'src/decorator/role.decorator';
import { Role } from 'src/enum/roles.enum';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector:Reflector) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log("Inside RoleGuard")
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if(!requiredRoles) {
          return true
        }
        
        const {user} = context.switchToHttp().getRequest();
        console.log(user,"user")
     return true
}
  }