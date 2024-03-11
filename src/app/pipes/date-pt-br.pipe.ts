import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePtBr'
})
export class DatePtBrPipe implements PipeTransform {

  transform(date: string): string {
    if (!date) {
      return '';
    }

    const dateLocal = new Date(date);
    const dateFormatted = new Date(dateLocal.getTime() + dateLocal.getTimezoneOffset() * 60000);

    return dateFormatted.toLocaleDateString('pt-BR');
  }

}
