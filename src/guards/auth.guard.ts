import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotAcceptableException
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Roles } from '../decorators/roles.decorator'
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const roles = this.reflector.getAllAndOverride(Roles, [
        context.getHandler(),
        context.getClass(),
      ]);
      const userRole = request.app.locals.user.role;
      const isValid = roles.includes(userRole);
      if (!isValid) {
        throw new NotAcceptableException("You can't has permission to access this route..")
      }
      return true;
    }
  }