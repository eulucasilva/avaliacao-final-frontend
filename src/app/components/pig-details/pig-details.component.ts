import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISuino } from '../../models/pig';
import { format } from 'date-fns';

@Component({
  selector: 'app-pig-details',
  templateUrl: './pig-details.component.html',
  styleUrl: './pig-details.component.css'
})
export class PigDetailsComponent {

  pigData!: ISuino;
  pigIndex!: number;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { pig: ISuino, pigIndex: number }) {
    this.pigData = data.pig;
    this.pigIndex = data.pigIndex;
  }

  formatDepartureDate(departureDate: string): string {
    if (!departureDate) {
      return '';
    }

    const departureDateLocal = new Date(departureDate);
    const departureDateFormatted = new Date(departureDateLocal.getTime() + departureDateLocal.getTimezoneOffset() * 60000);

    return departureDateFormatted.toLocaleDateString('pt-BR')

  }
}