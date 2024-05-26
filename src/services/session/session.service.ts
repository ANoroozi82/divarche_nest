import { Injectable } from '@nestjs/common';
import { baseService } from '../base/base.service';

@Injectable()
export class sessionService extends baseService {
  constructor() {
    super('sessions');
  }
}