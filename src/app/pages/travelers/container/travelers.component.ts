import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-travelers',
  imports: [MatIconModule],
  templateUrl: './travelers.component.html',
  styleUrls: ['./travelers.component.css']
})
export class TravelersComponent {
  
 constructor(){
  console.log("Viajando")
 }

 
}
