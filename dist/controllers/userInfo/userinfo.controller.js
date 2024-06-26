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
const ShortID = require("shortid");
const response_service_1 = require("../../services/response/response.service");
const session_service_1 = require("../../services/session/session.service");
const roles_decorator_1 = require("../../roles/roles.decorator");
const roles_enum_1 = require("../../roles/roles.enum");
const bcrypt = require("bcrypt");
const uuidv4_1 = require("uuidv4");
let UserinfoController = class UserinfoController {
    constructor(userService, sessionService) {
        this.userService = userService;
        this.sessionService = sessionService;
        this.saltRounnds = 10;
    }
    async signup(res, body) {
        try {
            const userValues = Object.values(body);
            const isAvailableUser = await this.userService.getSpecificRecord("*", ["username", "=", `${body['username']}`]);
            if (isAvailableUser.length === 0) {
                body['password'] = await this.encryptPassword(body['password']);
                body['user_id'] = ShortID.generate();
                body['role_name'] = 'admin';
                const { keys, values } = this.extractKeyAndValue(body);
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
            const resPassword = await this.userService.getSpecificRecord('username, password, role_name', ['username', '=', `${body['username']}`]);
            if (resPassword.length === 1) {
                if (await this.checkPassword(body['password'], resPassword[0]['password'])) {
                    await this.deleteUserSessions(body['username']);
                    delete resPassword[0].password;
                    const token = (0, uuidv4_1.uuid)();
                    const resSession = await this.sessionService.insert('token, info', `'${token}', '${JSON.stringify(resPassword[0])}'`);
                    res.cookie('token', token, {
                        httpOnly: true,
                        path: '/',
                        maxAge: 3600000
                    }).status(200).json(response_service_1.ResponseService.setMeta({
                        message: {
                            fa: "ورود با موفقیت انجام شد",
                            en: "Login was successful"
                        },
                        token: token
                    }));
                    console.log();
                }
                else {
                    return res.status(409).json(response_service_1.ResponseService.setMeta({
                        fa: "رمز ورود درست نمی باشد",
                        en: "The password is not correct"
                    }));
                }
            }
            else {
                return res.status(404).json(response_service_1.ResponseService.setMeta({
                    fa: "نام کاربری یافت نشد",
                    en: "The password is not found"
                }));
            }
        }
        catch (e) {
            return res.status(409).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async logout(res, req) {
        try {
            const resDelete = await this.sessionService.deleteSpecificRecord(['token', '=', `${req['cookies']['token']}`]);
            return res.clearCookie('token').status(200).json(response_service_1.ResponseService.setMeta({
                fa: "با موفقیت خارج شدید",
                en: "You have exited successfully"
            }));
        }
        catch (e) {
            return res.status(409).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async getInfo(req, res, body) {
        try {
            const sessionRes = await this.sessionService.getSpecificRecord('info', ['token', '=', req['cookies']['token']]);
            const user = await this.userService.getSpecificRecord("*", ["username", "=", JSON.parse(sessionRes[0]['info'])['username']]);
            delete user[0].password;
            delete user[0].user_id;
            return res.status(200).json(response_service_1.ResponseService.setMeta(user));
        }
        catch (error) {
            return res.status(409).json(response_service_1.ResponseService.setMeta({
                errors: error.message
            }));
        }
    }
    async updateInfo(res, body) {
        try {
            const userValue = Object.values(body);
            await this.userService.updateSpecificRecord(`city_id='${userValue[1]}',phone_number='${userValue[2]}'`, ["user_id", "=", userValue[0]]);
            return res.status(200).json(response_service_1.ResponseService.setMeta({
                fa: 'مشخصات شما به روز شد',
                en: 'updated userInfo'
            }));
        }
        catch (e) {
            return res.status(409).json(response_service_1.ResponseService.setMeta({
                errors: e.message
            }));
        }
    }
    async encryptPassword(password) {
        return await bcrypt.hash(password, this.saltRounnds);
    }
    async checkPassword(reqPassword, resPassword) {
        return await bcrypt.compare(reqPassword, resPassword);
    }
    extractKeyAndValue(body) {
        const key = Object.keys(body);
        const value = Object.values(body);
        return {
            keys: key.join(', '),
            values: value.map(item => `'${item}'`).join(', ')
        };
    }
    async deleteUserSessions(username) {
        try {
            const userSessions = await this.sessionService.getSpecificRecord('token', ['info', '=', `{"username":"${username}","role_name":"admin"}`]);
            if (userSessions.length > 0) {
                for (const session of userSessions) {
                    await this.sessionService.deleteSpecificRecord(['token', '=', `${session['token']}`]);
                }
            }
            return true;
        }
        catch (e) {
            return true;
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
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request]),
    __metadata("design:returntype", Promise)
], UserinfoController.prototype, "logout", null);
__decorate([
    (0, roles_decorator_1.RolesGuard)(roles_enum_1.Role.Admin),
    (0, common_1.Get)("getInfo"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object, Object]),
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