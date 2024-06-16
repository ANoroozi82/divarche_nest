import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException, Res
} from "@nestjs/common";
import { UserService } from "../../services/user/user.service";
import { Response } from "express";
import { ResponseService } from "../../services/response/response.service";
import { uuid } from "uuidv4";
import { sessionService } from "../../services/session/session.service";
import { RolesGuard } from "src/roles/roles.decorator";
import { Role } from "src/roles/roles.enum";


@Controller("user")
export class UserinfoController {
  constructor(private readonly userService: UserService, private readonly sessionService: sessionService) {
  }

  @RolesGuard(Role.User)
  @Post("signup")
  async signup(@Res() res: Response, @Body() body: object) {
    try {
      const userValues = Object.values(body);
      const isAvailableUser = await this.userService.getSpecificRecord("*", ["username", "=", `${userValues[4]}`]);
      if (isAvailableUser.length === 0) {
        const keys = "user_id,full_name,phone_number,city_id,role_name,username,password";
        const values = `'${uuid()}','${userValues[0]}','${userValues[1]}','${userValues[2]}','${userValues[3]}','${userValues[4]}','${userValues[5]}'`;
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
      const userValue = Object.values(body);
      const userData = await this.userService.getSpecificRecord("*", ["username", "=", `${userValue[0]}`]);
      if (userData.length === 0) {
        return res.status(409).json(ResponseService.setMeta({
          fa: "شما ثبت نام نکرده اید"
          , en: "You are not registered"
        }));
      } else {
        if (userData[0].password != userValue[1]) {
          return res.status(409).json(ResponseService.setMeta({
            fa: "رمز ورود درست نمی باشد"
            , en: "The password is not correct"
          }));
        } else {

            return res.status(200).json(ResponseService.setMeta({
              fa: "ورود با موفقیت انجام شد",
              en: "Login was successful"
            }));


        }
      }

    } catch (e) {
      return res.status(409).json(ResponseService.setMeta({
        errors: e.message
      }));
    }
  }

  @RolesGuard(Role.Admin)
  @Put("logout")
  async logout(@Res() res: Response) {
    try {
        return res.status(200).json(ResponseService.setMeta({
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
  async getInfo(@Res() res: Response, @Body() body: object) {
    try {

        const id = Object.values(body);
        const user = await this.userService.getSpecificRecord("*", ["user_id", "=", id[0]]);
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
        await this.userService.updateSpecificRecord(`city_id='${userValue[1]}',phone_number='${userValue[2]}'`, ["user_id","=" ,userValue[0]])
        return res.status(200).json(ResponseService.setMeta({
            fa:'مشخصات شما به روز شد',
            en:'updated userInfo'
          }
        ));
      }
     catch (e) {
      return res.status(409).json(ResponseService.setMeta({
        errors: e.message
      }));
    }
  }

}
