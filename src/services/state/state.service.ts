import { baseService } from "../base/base.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StateService extends baseService {
    constructor() {
        super('state')
    }
}