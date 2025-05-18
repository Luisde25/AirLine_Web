import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './container/navbar.component';

const routes: Routes = [

    {
      path: '',
      component: NavbarComponent,
      children: 
      [
        {
          path: 'travel',
          loadChildren: () => import('../travelers/traveles.module').then(t => t.TravelesModule)
        }
     
      ]

    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavbarRoutingModule { }
