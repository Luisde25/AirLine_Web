import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


export const routes: Routes = [
    {
       path: 'airline',
       loadChildren: () => import('./pages/navbar/navbar.module').then(n => n.NavbarModule)
    },
    { path: '', redirectTo: 'airline', pathMatch: 'full' }, //Redirige si la ruta es la raiz
    { path: '**', redirectTo: 'airline' }     // redirige cuando la ruta es incorrecta
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }