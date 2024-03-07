import { Component, Inject } from '@angular/core';
import { PigService } from '../../services/pig.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISuino } from '../../models/pig';
import { WeightService } from '../../services/weight.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IWeight } from '../../models/weight';

@Component({
  selector: 'app-pig-weight-registration',
  templateUrl: './pig-weight-registration.component.html',
  styleUrl: './pig-weight-registration.component.css'
})
export class PigWeightRegistrationComponent {
  weightForm: FormGroup;
  suinos!: ISuino[];
  weightData!: IWeight;
  weightIndex!: number;

  constructor(private fb: FormBuilder, private suinoService: PigService, private weightService: WeightService,
    private dialogRef: MatDialogRef<PigWeightRegistrationComponent>, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { action: string, weight: IWeight, weightIndex: number },) {
    this.weightForm = this.fb.group({
      animalTag: [data.weight?.animalTag || '', Validators.required],
      weighingDate: [data.weight?.weighingDate || '', Validators.required],
      weight: [data.weight?.weight || '', [Validators.required, Validators.pattern('[0-9]+')]]
    });
    this.weightData = data.weight;
    this.weightIndex = data.weightIndex;
  }

  ngOnInit(): void {
    this.loadSuinos();
  }

  loadSuinos(): void {
    this.suinoService.getAllPigs().subscribe(suinos => {
      this.suinos = suinos;
    });
  }

  onSaveClick(): void {
    if (this.weightForm.valid) {
      if (this.data.action === 'edit') {
        this.onEditClick();
      } else {
        this.onAddClick();
      }
    }
  }

  onAddClick(): void {
    if (this.weightForm.valid) {
      this.weightService.addWeight(this.weightForm.value).subscribe(() => {
        this.showNotification('Peso cadastrado com sucesso');
        this.weightForm.reset();
        this.dialogRef.close();
      });
    }
  }

  onEditClick(): void {
    const id = this.data.weight?.id;
    this.weightService.updateWeight(id, this.weightForm.value).subscribe(() => {
      this.showNotification('Pesagem editada com sucesso');
      this.weightService.emitWeightListUpdate();
      this.dialogRef.close();
    });
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000, // 3 segundos
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  isAnimalTagValid(): boolean {
    const animalTagControl = this.weightForm.get('animalTag');
    return !!animalTagControl?.touched && animalTagControl?.invalid;
  }

  isWeighingDateValid(): boolean {
    const weighingDateControl = this.weightForm.get('weighingDate');
    return !!weighingDateControl?.touched && weighingDateControl?.invalid;
  }

  isWeightValid(): boolean {
    const weightControl = this.weightForm.get('weight');
    return !!weightControl?.touched && weightControl?.invalid;
  }
}
