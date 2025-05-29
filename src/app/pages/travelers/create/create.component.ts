import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { CityAddDto } from '../../dtos/cityDto';

const TYPE_DOCUMENTS: string[]= ['Cedula de ciudadania', 'Cedula Extranjeria', 'Tarjeta de identidad', 'Registro civil']
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
  form!: FormGroup
  typeIdentification!: string[]
  countries: string[] = [];
  departments: string[] = [];
  cities: string[] = [];
  componentCities : CityAddDto[] = [];
  filteredDepartments: string[] = []
  filteredCities: string[] = []
  constructor(
    public _fb: FormBuilder,
    public dialog: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[]
  ){
    this.typeIdentification = TYPE_DOCUMENTS;

    const cities = JSON.parse(localStorage.getItem("city") ?? "") ?? "" ;
    if(cities){
      this.componentCities.push(...cities); 
      this.countries = this.componentCities.map(c => c.country);
      this.departments = this.componentCities.map(c => c.department);
      this.cities = this.componentCities.map(c => c.city);
      console.info(this.data)
    }

    
  }
    ngOnInit(): void {

      this.form = this._fb.group({
        name: [''],
        typeIdentification: [{ value: '', disabled: true }],
        identificationNumber: [{ value: '', disabled: true }],
        countries: [{ value: '', disabled: true }],
        departments: [{ value: '', disabled: true }],
        cities: [{ value: '', disabled: true }]
      });
  

      this.form.get('name')?.valueChanges.subscribe(name => {
        const control = this.form.get('typeIdentification');
        name ? control?.enable() : control?.disable();
        if (!name) {
          this.form.get('typeIdentification')?.reset();
          this.form.get('identificationNumber')?.disable();
          this.form.get('countries')?.disable();
          this.form.get('departments')?.disable();
          this.form.get('cities')?.disable();
        }
      });

       this.form.get('typeIdentification')?.valueChanges.subscribe(type => {
        const control = this.form.get('identificationNumber');
        type ? control?.enable() : control?.disable();
        if (!type) {
          this.form.get('identificationNumber')?.reset();
          this.form.get('countries')?.disable();
          this.form.get('departments')?.disable();
          this.form.get('cities')?.disable();
        }
      });

      this.form.get('identificationNumber')?.valueChanges.subscribe(type => {
        const control = this.form.get('countries');
        type ? control?.enable() : control?.disable();
        if (!type) {
          this.form.get('countries')?.reset();
          this.form.get('departments')?.disable();
          this.form.get('cities')?.disable();
        }
      });

      this.form.get('countries')?.valueChanges.subscribe(country => {
        const deptControl = this.form.get('departments');
        const cityControl = this.form.get('cities');
      
        if (country) {
          deptControl?.enable();
          cityControl?.disable();
          this.form.get('cities')?.reset();
        } else {
          deptControl?.disable();
          cityControl?.disable();
          this.form.get('departments')?.reset();
          this.form.get('cities')?.reset();
        }
      });
    
      this.form.get('departments')?.valueChanges.subscribe(type => {
        const control = this.form.get('cities');
        type ? control?.enable() : control?.disable();
        
      });

    }

    limitLength(event: any, maxLength: number) {
      const input = event.target;
      if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength);
      }
    }

    onSubmit(): void {
      if (this.form.valid) {
        const result: CityAddDto = this.form.value;
        this.dialog.close(result);
      }
    }

  get f(){
    return this.form.controls;
   }
  
    cancel(){
      this.dialog.close();
    }
}
