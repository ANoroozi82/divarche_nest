import Ajv from 'ajv';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ResponseService } from '../services/response/response.service';
import { signup, login, logout, updateInfo, getInfo, add } from '../schemas/schemas';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  private ajv = new Ajv({allErrors: true});
  private validate : object = {
    '/user/signup': this.ajv.compile(signup),
    '/user/login': this.ajv.compile(login),
    '/user/logout': this.ajv.compile(logout),
    '/user/getInfo': this.ajv.compile(getInfo),
    '/user/updateInfo': this.ajv.compile(updateInfo),
    '/posts/add': this.ajv.compile(add),
  };

  use(req: any, res: any, next: () => void) {
    const valid = this.validate[req._parsedUrl.pathname];

    if (valid(req.body)) {
      next();
    } else {
      res.status(409).json(ResponseService.setMeta(valid.errors));
    }
  }
}
