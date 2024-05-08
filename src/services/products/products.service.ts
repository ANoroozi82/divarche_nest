import { Injectable } from '@nestjs/common';
import { baseService } from '../base/base.service';

@Injectable()
export class ProductsService extends baseService {
  constructor() {
    super('products');
  }
}