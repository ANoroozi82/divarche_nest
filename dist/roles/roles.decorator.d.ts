import { Role } from './roles.enum';
export declare const ROLES_KEY = "roles";
export declare const RolesGuard: (...roles: Role[]) => import("@nestjs/common").CustomDecorator<string>;
