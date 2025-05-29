import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { CommonModule } from '@angular/common';
import { CityAddDto } from '../../dtos/cityDto';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-city',
  imports: [
    CommonModule,
    MatIconModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent implements OnInit {
  data: CityAddDto[] = [];
  city: any[] = [];;
constructor(
  private dialog: MatDialog
){

}
  ngOnInit(): void {
    const cities = JSON.parse(localStorage.getItem("city") ?? "") ?? "" ;
    if(cities){
      this.data.push(...cities); 
      console.info(this.data)
    }
  }

  addMenu(){
   const dialogRef =  this.dialog.open(CreateComponent, {
      width: '600px'
    })

    dialogRef.afterClosed().subscribe((result: CityAddDto) => {
      if(this.data.length > 0){
        const exists = this.data.some(item =>
          item.country === result.country &&
          item.department === result.department &&
          item.city === result.city
        );

        if (exists) {
          Swal.fire({
            icon: 'warning',
            title: 'Registro duplicado',
            text: `La ciudad "${result.city}" en ${result.department}, ${result.country} ya existe.`,
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#dc3545',
            allowOutsideClick: false,  
            // allowEscapeKey: false,    
          });
          return;
        }

        if(!exists && result.country != '' && result.department != '' && result.city != ''){
          this.data.push(result);  
          localStorage.setItem("city", JSON.stringify(this.data));
          Swal.fire({
            icon: 'success',
            title: 'Acción exitosa',
            text: `La ciudad "${result.city}" en ${result.department}, ${result.country} se inserto de forma correcta.`,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#dc3545',
            allowOutsideClick: false,  
            // allowEscapeKey: false,  
          }); 
        }else{
          Swal.fire({
            icon: 'warning',
            title: 'Debes seleccionar la información del país, departamento y ciudad de forma manera correcta',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#dc3545',
            allowOutsideClick: false,  
            // allowEscapeKey: false,  
          });
        }
     }else{
        if(result.country != '' && result.department != '' && result.city != '') {
          this.data.push(result);  
          localStorage.setItem("city", JSON.stringify(this.data));  
          Swal.fire({
            icon: 'success',
            title: 'Acción exitosa',
            text: `La ciudad "${result.city}" en ${result.department}, ${result.country} se inserto de forma correcta.`,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#dc3545',
            allowOutsideClick: false,  
            // allowEscapeKey: false,    
          });
        }else{
          Swal.fire({
            icon: 'warning',
            title: 'Debes seleccionar la información del país, departamento y ciudad de forma manera correcta',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#dc3545',
            allowOutsideClick: false,  
            // allowEscapeKey: false,    
          });
        }
     }

    });
  }

  delete(){
    if(this.data.length > 0){
      this.data = [];
      localStorage.removeItem("city");
      Swal.fire({
        icon: 'success',
        title: 'Eliminación exitosa',
        text: `Lista de ciudades limpiada de forma correcta`,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#dc3545',
        allowOutsideClick: false,  
        // allowEscapeKey: false,    
      });

    }
   
  }
}
