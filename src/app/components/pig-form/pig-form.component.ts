import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PigService } from '../../services/pig.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ISuino } from '../../models/pig';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-pigform',
  templateUrl: './pig-form.component.html',
  styleUrl: './pig-form.component.css',
})
export class PigFormComponent implements OnInit {

  pigForm: FormGroup;
  statusOptions: string[] = ['Ativo', 'Vendido', 'Morto'];
  sexOptions: string[] = ['Macho', 'Fêmea'];
  pigData!: ISuino;
  pigIndex!: number;

  constructor(private fb: FormBuilder, private suinoService: PigService,
    @Inject(MAT_DIALOG_DATA) public data: { action: string, pig: ISuino, pigIndex: number },
    private dialogRef: MatDialogRef<PigFormComponent>, private snackBar: MatSnackBar) {
    this.pigForm = this.fb.group({
      animalTag: [data.pig?.animalTag || '', [Validators.required, Validators.pattern('^[0-9]*$'),]],
      fatherTag: [data.pig?.fatherTag || '', [Validators.required, Validators.pattern('^[0-9]*$')]],
      motherTag: [data.pig?.motherTag || '', [Validators.required, Validators.pattern('^[0-9]*$')]],
      birthDate: [data.pig?.birthDate || '', [Validators.required,]],
      departureDate: [data.pig?.departureDate || '', [Validators.required,]],
      sex: [data.pig?.sex || '', Validators.required],
      status: [data.pig?.status || '', Validators.required],
    });

    this.pigData = data.pig;
    this.pigIndex = data.pigIndex;
  }

  ngOnInit(): void {
    this.pigData = this.data.pig;
  }



  onSaveClick(): void {
    if (this.pigForm.valid) {
      if (this.data.action === 'edit') {
        this.onEditClick();
      } else {
        this.onAddClick();
      }
    }
  }

  onAddClick(): void {
    const formValue = this.pigForm.value;

    const birthDate = new Date(formValue.birthDate);
    const departureDate = new Date(formValue.departureDate);

    formValue.birthDate = birthDate;
    formValue.departureDate = departureDate;

    console.log(this.pigForm.value)
    this.suinoService.addPig(this.pigForm.value).subscribe(() => {
      this.showNotification('Suíno cadastrado com sucesso');
      this.suinoService.emitPigListUpdate();
      this.dialogRef.close();
    });
  }


  onEditClick(): void {
    const id = this.data.pig.id;
    this.suinoService.updatePig(id, this.pigForm.value).subscribe(() => {
      this.showNotification('Suíno editado com sucesso');
      this.suinoService.emitPigListUpdate();
      this.dialogRef.close();
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000, // 3 segundos
    });
  }

  isBirthDateValid(): boolean {
    const pigDateControl = this.pigForm.get('birthDate');
    return !!pigDateControl?.touched && pigDateControl?.invalid;
  }

  isDepartureDateValid(): boolean {
    const pigDateControl = this.pigForm.get('departureDate');
    return !!pigDateControl?.touched && pigDateControl?.invalid;
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const currentDate = new Date();
      const selectedDate = this.formatDate(new Date(control.value));

      if (!this.isValidDate(selectedDate) || selectedDate > currentDate) {
        return { 'invalidDate': true };
      }
      return null;
    };
  }

  isValidDate(date: Date): boolean {
    return !isNaN(date.getTime());
  }

  formatDate(date: Date): Date {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return new Date(`${this.padZero(day)}/${this.padZero(month)}/${year}`);
  }

  padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }
}

