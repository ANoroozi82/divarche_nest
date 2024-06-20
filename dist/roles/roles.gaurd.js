"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const session_service_1 = require("../services/session/session.service");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("./roles.decorator");
let RolesGuard = class RolesGuard {
    constructor(reflector, sessionService) {
        this.reflector = reflector;
        this.sessionService = sessionService;
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        try {
            const request = context.switchToHttp().getRequest();
            const result = await this.sessionService.getSpecificRecord('info', ['token', '=', request['cookies']['token']]);
            const json = JSON.parse(result[0]['info']);
            return requiredRoles.some((role) => json['role_name'].includes(role));
        }
        catch (err) {
            return requiredRoles.some((role) => 'user'.includes(role));
        }
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, session_service_1.sessionService])
], RolesGuard);
//# sourceMappingURL=roles.gaurd.js.map