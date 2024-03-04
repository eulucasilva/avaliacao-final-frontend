import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pigform',
  templateUrl: './pigform.component.html',
  styleUrl: './pigform.component.css',
})
export class PigformComponent implements OnInit {
  pigForm: FormGroup;
  statusOptions: string[] = ['Ativo', 'Vendido', 'Morto'];
  sexOptions: string[] = ['Macho', 'Fêmea']

  constructor(private fb: FormBuilder) {
    this.pigForm = this.fb.group({
      animalTag: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      paiTag: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      maeTag: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      birthDate: ['', Validators.required],
      departureDate: ['', Validators.required],
      sex: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit(){
    if (this.pigForm.valid) {
      const formData = this.pigForm.value;
      console.log(formData);
    }
  }

  submitForm(){
    console.log(this.pigForm)
  }
}
