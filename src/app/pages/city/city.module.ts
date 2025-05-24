import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { CityComponent } from './container/city.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatIconModule,
    
    CityRoutingModule
  ]
})
export class CityModule { }
