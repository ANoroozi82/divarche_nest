import { Controller, Get, Post, Put, Body, Res, Req } from "@nestjs/common";
import { UserService } from "../../services/user/user.service";
import { Response } from "express";
import * as  ShortID from "shortid";
import { ResponseService } from "../../services/response/response.service";
import { sessionService } from "../../services/session/session.service";
import { RolesGuard } from "src/roles/roles.decorator";
import { Role } from "src/roles/roles.enum";
import * as bcrypt from 'bcrypt';
import { uuid } from "uuidv4";


@Controller("user")
export class UserinfoController {
  constructor(private readonly userService: UserService, private readonly sessionService: sessionService) {
  }

  saltRounnds: number = 10;

  @RolesGuard(Role.User)
  @Post("signup")
  async signup(@Res() res: Response, @Body() body: object) {
    try {
      const userValues = Object.values(body);
      const isAvailableUser = await this.userService.getSpecificRecord("*", ["username", "=", `${body['username']}`]);
      if (isAvailableUser.length === 0) {
        body['password'] = await this.encryptPassword(body['password']);
        body['user_id'] = ShortID.generate();
        body['role_name'] = 'admin';
        const { keys, values } = this.extractKeyAndValue(body);
        await this.userService.insert(keys, values);
        return res.status(200).json(ResponseService.setMeta({
          fa: "ثبت نام با موفقیت انجام شد",
          en: "Registration was successful"
        }));
      } else {
        return res.status(409).json(ResponseService.setMeta({
          fa: "نام کاربری قبلا ثبت شده",
          en: "The username is already registered"
        }));
      }
    } catch (e) {
      return res.status(409).json(ResponseService.setMeta({
        errors: e.message
      }));
    }
  }

  @RolesGuard(Role.User)
  @Put("login")
  async login(@Res() res: Response, @Body() body: object) {
    try {
      const resPassword = await this.userService.getSpecificRecord('username, password, role_name', ['username', '=', `${body['username']}`]);
      if (resPassword.length === 1) {
        if (await this.checkPassword(body['password'], resPassword[0]['password'])) {
          delete resPassword[0].password;
          const token = uuid();
          const resSession = await this.sessionService.insert('token, info', `'${token}', '${JSON.stringify(resPassword[0])}'`);
          res.cookie('token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 3600000
          }).status(200).json(ResponseService.setMeta({
            fa: "ورود با موفقیت انجام شد",
            en: "Login was successful"
          }));
          console.log();
        } else {
          return res.status(409).json(ResponseService.setMeta({
            fa: "رمز ورود درست نمی باشد",
            en: "The password is not correct"
          }));
        }
      } else {
        return res.status(404).json(ResponseService.setMeta({
          fa: "نام کاربری یافت نشد", 
          en: "The password is not found"
        }));
      }
    } catch (e) {
      return res.status(409).json(ResponseService.setMeta({
        errors: e.message
      }));
    }
  }

  @RolesGuard(Role.Admin)
  @Put("logout")
  async logout(@Res() res: Response, @Req() req: Request) {
    try {
      const resDelete = await this.sessionService.deleteSpecificRecord(['token', '=', `${req['cookies']['token']}`]);
      return res.clearCookie('token').status(200).json(ResponseService.setMeta({
        fa: "با موفقیت خارج شدید",
        en: "You have exited successfully"
      }));
    } catch (e) {
      return res.status(409).json(ResponseService.setMeta({
        errors: e.message
      }));
    }
  }

  @RolesGuard(Role.Admin)
  @Get("getInfo")
  async getInfo(@Req() req: Request, @Res() res: Response, @Body() body: object) {
    try {
      const sessionRes = await this.sessionService.getSpecificRecord('info', ['token', '=', req['cookies']['token']]);
      const user = await this.userService.getSpecificRecord("*", ["username", "=", JSON.parse(sessionRes[0]['info'])['username']]);
      delete user[0].password;
      delete user[0].user_id;
      return res.status(200).json(ResponseService.setMeta(user));
    }
    catch (error) {
      return res.status(409).json(ResponseService.setMeta({
        errors: error.message
      }));
    }
  }

  @RolesGuard(Role.Admin)
  @Post("updateInfo")
  async updateInfo(@Res() res: Response, @Body() body: object) {
    try {

      const userValue = Object.values(body);
      await this.userService.updateSpecificRecord(`city_id='${userValue[1]}',phone_number='${userValue[2]}'`, ["user_id", "=", userValue[0]])
      return res.status(200).json(ResponseService.setMeta({
        fa: 'مشخصات شما به روز شد',
        en: 'updated userInfo'
      }
      ));
    }
    catch (e) {
      return res.status(409).json(ResponseService.setMeta({
        errors: e.message
      }));
    }
  }

  async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounnds);
  }

  async checkPassword(reqPassword: string, resPassword: string): Promise<boolean> {
    return await bcrypt.compare(reqPassword, resPassword);
  }

  extractKeyAndValue(body: object) {
    const key = Object.keys(body);
    const value = Object.values(body);

    return {
      keys: key.join(', '),
      values: value.map(item => `'${item}'`).join(', ')
    }
  }
}
