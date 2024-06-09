import { Injectable } from '@nestjs/common';
import { baseService } from '../base/base.service';

@Injectable()
export class UserService extends baseService {
  constructor() {
    super('users');
  }
}
