import { Injectable } from '@nestjs/common';
import { baseService } from '../base/base.service';

@Injectable()
export class PostsService extends baseService {
  constructor() {
    super('posts');
  }
}