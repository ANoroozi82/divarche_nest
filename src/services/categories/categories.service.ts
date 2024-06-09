import { baseService } from "../base/base.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoriesService extends baseService{
  constructor() {
    super('categories');
  }
}