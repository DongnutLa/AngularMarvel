import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dates'
})
export class DatesPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string {
    return moment(value, "YYYYMMDD").fromNow();
  }

}
