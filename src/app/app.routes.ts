import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TravelersComponent } from './pages/travelers/container/travelers.component';
import { CityComponent } from './pages/city/container/city.component';


export const routes: Routes = [
    {
       path: 'airline',
       children: [
        {
          path: 'travel', 
          component: TravelersComponent, 
        },
        {
          path: 'city',
          component: CityComponent, 
        },
      ],
    },
    { path: '', redirectTo: 'airline', pathMatch: 'full' }, //Redirige si la ruta es la raiz
    { path: '**', redirectTo: 'airline' }     // redirige cuando la ruta es incorrecta
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }