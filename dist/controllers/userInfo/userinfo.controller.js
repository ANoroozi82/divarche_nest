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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserinfoController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../services/user/user.service");
const response_service_1 = require("../../services/response/response.service");
const uuidv4_1 = require("uuidv4");
const session_service_1 = require("../../services/session/session.service");
const roles_decorator_1 = require("../../roles/roles.decorator");
const roles_enum_1 = require("../../roles/roles.enum");
let UserinfoController = class UserinfoController {
    constructor(userService, sessionService) {
        this.userService = userService;
        this.sessionService = sessionService;
    }
    async signup(res, body) {
        try {
            const userValues = Object.values(body);
            const isAvailableUser = await this.userService.getSpecificRecord("*", ["username", "=", `${userValues[4]}`]);
            if (isAvailableUser.length === 0) {
                const keys = "user_id,full_name,phone_number,city_id,role_name,username,password";
                const values = `'${(0, uuidv4_1.uuid)()}','${userValues[0]}','${userValues[1]}','${userValues[2]}','${userValues[3]}','${userValues[4]}','${userValues[5]}'`;
                await this.userService.insert(keys, values);
                return res.status(200).json(response_service_1.ResponseService.setMeta({
                    fa: "ثبت نام با موفقیت انجام شد",
                    en: "Registration was successful"
                }));
            }
            else {
                return res.status(409).json(response_service_1.ResponseService.setMeta({
                    fa: "نام کاربری قبلا ثبت شده",
                    en: "The username is already registered"
                }));
            }
        }
        catch (e) {
            return res.status(409).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async login(res, body) {
        try {
            const userValue = Object.values(body);
            const userData = await this.userService.getSpecificRecord("*", ["username", "=", `${userValue[0]}`]);
            if (userData.length === 0) {
                return res.status(409).json(response_service_1.ResponseService.setMeta({
                    fa: "شما ثبت نام نکرده اید",
                    en: "You are not registered"
                }));
            }
            else {
                if (userData[0].password != userValue[1]) {
                    return res.status(409).json(response_service_1.ResponseService.setMeta({
                        fa: "رمز ورود درست نمی باشد",
                        en: "The password is not correct"
                    }));
                }
                else {
                    let token = await this.sessionService.get();
                    if (token.length === 0) {
                        token = crypto.randomUUID();
                        await this.sessionService.insert("token", `'${token}'`);
                        return res.status(200).json(response_service_1.ResponseService.setMeta({
                            fa: "ورود با موفقیت انجام شد",
                            en: "Login was successful"
                        }));
                    }
                    else {
                        return res.status(403).json(response_service_1.ResponseService.setMeta({
                            fa: "شما قبلا وارد شدید",
                            en: "You are already logged in"
                        }));
                    }
                }
            }
        }
        catch (e) {
            return res.status(409).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async logout(res) {
        try {
            let token = await this.sessionService.get();
            if (token.length === 0) {
                return res.status(403).json(response_service_1.ResponseService.setMeta({
                    fa: "شما دستررسی ندارید",
                    en: "access Denied!!!"
                }));
            }
            else {
                await this.sessionService.deleteSpecificRecord(["token", "=", `${token[0].token}`]);
                return res.status(200).json(response_service_1.ResponseService.setMeta({
                    fa: "با موفقیت خارج شدید",
                    en: "You have exited successfully"
                }));
            }
        }
        catch (e) {
            return res.status(409).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async getInfo(res, body) {
        try {
            let token = await this.sessionService.get();
            if (token.length === 0) {
                return res.status(403).json(response_service_1.ResponseService.setMeta({
                    fa: "شما دستررسی ندارید",
                    en: "access Denied!!!"
                }));
            }
            else {
                const id = Object.values(body);
                const user = await this.userService.getSpecificRecord("*", ["user_id", "=", id[0]]);
                return res.status(200).json(response_service_1.ResponseService.setMeta(user));
            }
        }
        catch (error) {
            return res.status(409).json(response_service_1.ResponseService.setMeta({
                errors: error.message
            }));
        }
    }
    async updateInfo(res, body) {
        try {
            let token = await this.sessionService.get();
            if (token.length === 0) {
                return res.status(403).json(response_service_1.ResponseService.setMeta({
                    fa: "شما دستررسی ندارید",
                    en: "access Denied!!!"
                }));
            }
            else {
                const userValue = Object.values(body);
                await this.userService.updateSpecificRecord(`city_id='${userValue[1]}',phone_number='${userValue[2]}'`, ["user_id", "=", userValue[0]]);
                return res.status(200).json(response_service_1.ResponseService.setMeta({
                    fa: 'مشخصات شما به روز شد',
                    en: 'updated userInfo'
                }));
            }
        }
        catch (e) {
            return res.status(409).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
};
exports.UserinfoController = UserinfoController;
__decorate([
    (0, roles_decorator_1.RolesGuard)(roles_enum_1.Role.User),
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserinfoController.prototype, "signup", null);
__decorate([
    (0, roles_decorator_1.RolesGuard)(roles_enum_1.Role.User),
    (0, common_1.Put)("login"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserinfoController.prototype, "login", null);
__decorate([
    (0, roles_decorator_1.RolesGuard)(roles_enum_1.Role.Admin),
    (0, common_1.Put)("logout"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserinfoController.prototype, "logout", null);
__decorate([
    (0, roles_decorator_1.RolesGuard)(roles_enum_1.Role.Admin),
    (0, common_1.Get)("getInfo"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserinfoController.prototype, "getInfo", null);
__decorate([
    (0, roles_decorator_1.RolesGuard)(roles_enum_1.Role.Admin),
    (0, common_1.Post)("updateInfo"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserinfoController.prototype, "updateInfo", null);
exports.UserinfoController = UserinfoController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [user_service_1.UserService, session_service_1.sessionService])
], UserinfoController);
//# sourceMappingURL=userinfo.controller.js.map