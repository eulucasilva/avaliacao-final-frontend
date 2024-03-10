import { Pipe, PipeTransform } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);


@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(birthDate: string): string {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getMonth() - birth.getMonth() +
      (12 * (today.getFullYear() - birth.getFullYear()));
    if (today.getDate() < birth.getDate()) {
      age--;
    }
    return age + ' meses';
  }

}
