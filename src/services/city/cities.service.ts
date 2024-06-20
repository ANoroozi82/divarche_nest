import { baseService } from "../base/base.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CitiesService extends baseService{
    constructor() {
        super('city')
    }
}