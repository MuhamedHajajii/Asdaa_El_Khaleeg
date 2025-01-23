import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment-hijri';

@Pipe({
  name: 'hijriDate',
  standalone: true, // Marking the pipe as standalone
})
export class HijriDatePipe implements PipeTransform {
  transform(value: unknown, format: string = 'iD iMMMM iYYYY'): unknown {
    if (!value) {
      return null;
    }

    try {
      const hijriDate = moment(value).locale('ar-sa').format(format);
      return hijriDate;
    } catch (error) {
      return value;
    }
  }
}
