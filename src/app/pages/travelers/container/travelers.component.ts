import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreateComponent } from '../create/create.component';
import Swal from 'sweetalert2';
import { PassagerAddDto } from '../../dtos/passagerDto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-travelers',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule],
  templateUrl: './travelers.component.html',
  styleUrls: ['./travelers.component.css']
})
export class TravelersComponent implements OnInit {
  data: PassagerAddDto[] = []
  searchText: string = '';
  filteredData: any[] = [];

 constructor(
  public dialog: MatDialog,
  public router: Router

  ){

    
    
 }
  ngOnInit(): void {
    const passager =  localStorage.getItem("passager");

    if(passager){
      const passag = JSON.parse(passager) ?? "" ;
      if(passager){
        this.data.push(...passag); 
        console.info(this.data)
      }
    }
  }




 addPassager(){

  const cityData = localStorage.getItem("city");
  if(cityData == null){
      Swal.fire({
        icon: 'warning',
        title: 'Falta la cuidad',
        text: `Primero debes ingresar una ciudad`,
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#dc3545',
        allowOutsideClick: false,
      }).then(() => {
        this.router.navigate(['/airline/city']);
      });
      
  return; 
  }

  const dialogRef =  this.dialog.open(CreateComponent, {
       width: '900px'
     })

     dialogRef.afterClosed().subscribe((result: PassagerAddDto) => {
        if(this.data.length > 0)
        {
              const exists = this.data.some(item =>
                item.name === result.name &&
                item.typeIdentification === result.typeIdentification &&
                item.identificationNumber === result.identificationNumber &&
                item.countries === result.countries &&
                item.departments === result.departments &&
                item.cities === result.cities
              );

              if (exists) {
                Swal.fire({
                  icon: 'warning',
                  title: 'Registro duplicado',
                  text: `El Sr/Sra ${result.name} ya existe.`,
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: '#dc3545',
                  allowOutsideClick: false,
                  // allowEscapeKey: false,
                });
                return;
              }

              if(!exists && result.name != '' && result.typeIdentification != '' && result.identificationNumber != ''
                && result.countries != '' && result.departments != '' && result.cities != ''){
                this.data.push(result);
                 localStorage.setItem("passager", JSON.stringify(this.data));
                Swal.fire({
                  icon: 'success',
                  title: 'Acción exitosa',
                  text: `El Sr/Sra ${result.name} re registro de forma correcta.`,
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#dc3545',
                  allowOutsideClick: false,
                  // allowEscapeKey: false,
                });
              }else{
                Swal.fire({
                  icon: 'warning',
                  title: 'Debes seleccionar la información del formulario de forma correcta',
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: '#dc3545',
                  allowOutsideClick: false,
                  // allowEscapeKey: false,
                });
            }
        }else{
            if(result.name != '' && result.typeIdentification != '' && result.identificationNumber != ''
              && result.countries != '' && result.departments != '' && result.cities != '') {
                this.data.push(result);
                localStorage.setItem("passager", JSON.stringify(this.data));
                Swal.fire({
                  icon: 'success',
                  title: 'Acción exitosa',
                  text: `Se agrego el Sr/Sra. ${result.name} de forma correcta.`,
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#dc3545',
                  allowOutsideClick: false,
                  // allowEscapeKey: false,
                });
              }else{
                Swal.fire({
                  icon: 'warning',
                  title: 'Debes seleccionar la información del formulario de forma correcta',
                  confirmButtonText: 'Cerrar',
                  confirmButtonColor: '#dc3545',
                  allowOutsideClick: false,
                  // allowEscapeKey: false,
                });
              }
        }
  })

  }

  buscar() {
    const text = this.searchText.toLowerCase().trim();
    if (!text) {
        location.reload()
    }

    this.data = this.data.filter((pasajero:PassagerAddDto) =>
      pasajero.identificationNumber.toString().toLowerCase().includes(text) ||
      pasajero.countries.toLowerCase().includes(text) ||
      pasajero.cities.toLowerCase().includes(text) );
   
  }

  delete(){
     if(this.data.length > 0){
          this.data = [];
          //localStorage.removeItem("city");
          Swal.fire({
            icon: 'success',
            title: 'Eliminación exitosa',
            text: `Lista de pasajeros fueron limpiada de forma correcta`,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#dc3545',
            allowOutsideClick: false,  
            // allowEscapeKey: false,    
          });
    
        }
  }

}
