import { Component, Inject } from '@angular/core';
import { PigService } from '../../services/pig.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ISuino } from '../../models/pig';

@Component({
  selector: 'app-pig-details',
  templateUrl: './pig-details.component.html',
  styleUrl: './pig-details.component.css'
})
export class PigDetailsComponent {

  pigData!: ISuino;
  pigIndex!: number;


  constructor(private suinoService: PigService,
    @Inject(MAT_DIALOG_DATA) public data: { pig: ISuino, pigIndex: number }) {
    this.pigData = data.pig;
    this.pigIndex = data.pigIndex;
  }
}
