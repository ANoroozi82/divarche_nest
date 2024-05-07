import { Injectable } from '@nestjs/common';
import * as moment from 'jalali-moment';

@Injectable()
export class ResponseService {
  static setMeta(send : object) {
    const jalaliDateTime = moment().locale('fa').format('YYYY/MM/DD HH:mm:ss');
    return {
      meta : {
        date : jalaliDateTime.replaceAll('/', '.').replaceAll(' ', ' | '),
      },
      data : send
    }
  }
}
