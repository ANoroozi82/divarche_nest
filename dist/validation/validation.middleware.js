"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const ajv_1 = require("ajv");
const common_1 = require("@nestjs/common");
const response_service_1 = require("../services/response/response.service");
const schemas_1 = require("../schemas/schemas");
let ValidationMiddleware = class ValidationMiddleware {
    constructor() {
        this.ajv = new ajv_1.default({ allErrors: true });
        this.validate = {
            "/user/signup": this.ajv.compile(schemas_1.signup),
            "/user/login": this.ajv.compile(schemas_1.login),
            "/user/logout": this.ajv.compile(schemas_1.logout),
            "/user/getInfo": this.ajv.compile(schemas_1.getInfo),
            "/user/updateInfo": this.ajv.compile(schemas_1.updateInfo),
            "/posts/add": this.ajv.compile(schemas_1.add)
        };
    }
    use(req, res, next) {
        const valid = this.validate[req._parsedUrl.pathname];
        if (valid(req.body)) {
            next();
        }
        else {
            res.status(409).json(response_service_1.ResponseService.setMeta(valid.errors));
        }
    }
};
exports.ValidationMiddleware = ValidationMiddleware;
exports.ValidationMiddleware = ValidationMiddleware = __decorate([
    (0, common_1.Injectable)()
], ValidationMiddleware);
//# sourceMappingURL=validation.middleware.js.map