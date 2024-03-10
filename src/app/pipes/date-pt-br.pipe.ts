import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePtBr'
})
export class DatePtBrPipe implements PipeTransform {

  transform(date: string): string {
    if (!date) {
      return '';
    }

    const departureDateLocal = new Date(date);
    const departureDateFormatted = new Date(departureDateLocal.getTime() + departureDateLocal.getTimezoneOffset() * 60000);

    return departureDateFormatted.toLocaleDateString('pt-BR');
  }

}
