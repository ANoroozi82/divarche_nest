import { CanActivate, ExecutionContext } from '@nestjs/common';
import { sessionService } from '../services/session/session.service';
import { Reflector } from '@nestjs/core';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private sessionService;
    constructor(reflector: Reflector, sessionService: sessionService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
