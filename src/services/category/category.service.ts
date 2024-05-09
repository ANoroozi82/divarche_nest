import { baseService } from "../base/base.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryService extends baseService{
  constructor() {
    super('category');
  }
}