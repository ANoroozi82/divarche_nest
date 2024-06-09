import { baseService } from "../base/base.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FieldsService extends baseService{
  constructor() {
    super('fields');
  }
}