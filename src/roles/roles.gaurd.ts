import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { sessionService } from '../services/session/session.service';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from "./roles.decorator";
import { Role } from './roles.enum';
import { promises } from 'dns';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private sessionService: sessionService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    try {
      const request = context.switchToHttp().getRequest<Request>();
      const result = await this.sessionService.getSpecificRecord('info', ['token', '=', request['cookies']['token']]);
      const json = JSON.parse(result[0]['info']);
      
      return requiredRoles.some((role) => json.role.includes(role));
    }
    catch (err) {
      return requiredRoles.some((role) => 'user'.includes(role));      
    }
  }
}