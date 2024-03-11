import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PigService } from '../../services/pig.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ISuino } from '../../models/pig';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';


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
      birthDate: [data.pig?.birthDate || '', [Validators.required, this.dateValidator()]],
      departureDate: [data.pig?.departureDate || '', [Validators.required, this.dateValidator()]],
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
      const dateValue = control.value;
      console.log(dateValue)
      if (!dateValue) {
        return null; // Retorna null se o campo estiver vazio
      }

      const date = moment(dateValue, 'DD/MM/YYYY', true); // Parse a data no formato correto

      if (!date.isValid()) {
        return { 'invalidDate': true }; // Retorna um erro se a data for inválida
      }

      const day = date.date();
      const month = date.month() + 1; // Moment.js representa janeiro como 0, então somamos 1 para obter o mês correto
      const year = date.year();

      // Verifica se o ano é bissexto
      const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

      // Verifica se o mês é válido (entre 1 e 12)
      if (month < 1 || month > 12) {
        return { 'invalidMonth': true }; // Retorna um erro se o mês for inválido
      }

      // Verifica se o dia é válido para o mês, considerando se o ano é bissexto
      const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (day < 1 || day > daysInMonth[month - 1]) {
        return { 'invalidDay': true }; // Retorna um erro se o dia for inválido
      }

      // Verifica se a data selecionada é no futuro
      const currentDate = moment().startOf('day');
      if (date.isAfter(currentDate)) {
        return { 'futureDate': true }; // Retorna um erro se a data for no futuro
      }


      return null; // Retorna null se a data for válida
    };
  }



}

