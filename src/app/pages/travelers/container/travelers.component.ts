import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travelers',
  imports: [],
  templateUrl: './travelers.component.html',
  styleUrls: ['./travelers.component.css']
})
export class TravelersComponent {
  
 constructor(){
  console.log("Viajando")
 }
}
