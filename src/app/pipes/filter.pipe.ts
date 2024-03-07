import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: Array<any>, filter: string): any {
    if (filter) {
      filter = filter.toUpperCase();

      return value.filter(a =>
        a.animalTag.toUpperCase() === filter
      );
    } else {
      return value;
    }
  }
}
