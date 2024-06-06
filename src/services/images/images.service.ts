import { baseService } from "../base/base.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ImagesService extends baseService{
  constructor() {
    super('images');
  }
}