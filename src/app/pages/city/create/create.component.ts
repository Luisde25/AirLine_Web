import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CityAddDto } from '../../dtos/cityDto';
import { CommonModule } from '@angular/common';

const COUNTRY_DEPARTMENTS: Record<string, string[]> = {
  Colombia: ['Antioquia', 'Cundinamarca', 'Valle del Cauca'],
  México: ['CDMX', 'Jalisco', 'Nuevo León'],
  Argentina: ['Buenos Aires', 'Córdoba', 'Santa Fe'],
};

const DEPARTMENT_CITIES: Record<string, string[]> = {
  Antioquia: ['Medellín', 'Envigado', 'Rionegro'],
  Cundinamarca: ['Bogotá', 'Soacha', 'Chía'],
  'Valle del Cauca': ['Cali', 'Palmira', 'Buenaventura'],
  CDMX: ['Ciudad de México', 'Coyoacán', 'Tlalpan'],
  Jalisco: ['Guadalajara', 'Zapopan', 'Tlaquepaque'],
  'Nuevo León': ['Monterrey', 'San Nicolás', 'Guadalupe'],
  'Buenos Aires': ['La Plata', 'Mar del Plata', 'Bahía Blanca'],
  Córdoba: ['Villa Carlos Paz', 'Río Cuarto', 'Córdoba'],
  'Santa Fe': ['Rosario', 'Santa Fe', 'Rafaela'],
};

@Component({
  selector: 'app-create',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule
],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
    addCreate!: FormGroup
    countries: string[] = [];
    departments: string[] = [];
    cities: string[] = [];
    submittedData: Array<{ country: string; department: string; city: string }> = [];
    Info!: any;
    constructor(
      public _fb: FormBuilder,
      public dialogRef: MatDialogRef<CreateComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any[]
    ){

      this.addCreate = this._fb.group({
        country: [''],
        department: [''],
        city: ['']
      });
    }

  ngOnInit(): void {
      this.Informations();
  }

  Informations(){
    this.countries = Object.keys(COUNTRY_DEPARTMENTS);

    this.addCreate.get('country')!.valueChanges.subscribe(country => {
      this.departments = COUNTRY_DEPARTMENTS[country] || [];
      this.cities = [];
      this.addCreate.patchValue({ department: '', city: '' }, { emitEvent: false });
    });

    this.addCreate.get('department')!.valueChanges.subscribe(dept => {
      this.cities = DEPARTMENT_CITIES[dept] || [];
      this.addCreate.patchValue({ city: '' }, { emitEvent: false });
    });
    
  }

  onSubmit(): void {
    if (this.addCreate.valid) {
      const result: CityAddDto = this.addCreate.value;
      this.dialogRef.close(result);
    }
  }

 get f(){
  return this.addCreate.controls;
 }

  cancel(){
    this.dialogRef.close();
  }
}
