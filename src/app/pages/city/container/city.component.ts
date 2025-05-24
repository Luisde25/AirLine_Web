import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-city',
  imports: [MatIconModule],
  templateUrl: './city.component.html',
  styleUrl: './city.component.css'
})
export class CityComponent {

  data: any[] = [
    { city: 'Bogotá', department: 'Cundinamarca', country: 'Colombia' },
    { city: 'Medellín', department: 'Antioquia', country: 'Colombia' },
    { city: 'Quito', department: 'Pichincha', country: 'Ecuador' },
    { city: 'Lima', department: 'Lima', country: 'Perú' },
    { city: 'Santiago', department: 'Región Metropolitana', country: 'Chile' }
  ];

}
