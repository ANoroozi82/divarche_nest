import { Injectable } from '@nestjs/common';
import { baseService } from './base.service';

@Injectable()
export class UserService extends baseService {
  constructor() {
    super('users');
  }
}
