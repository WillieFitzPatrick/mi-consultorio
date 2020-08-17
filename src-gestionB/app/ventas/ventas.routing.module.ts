import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentasHomeComponent } from './ventashome.component';
import { VentasComponent } from './ventas.component';
import { ClientesComponent } from './clientes.component';
import { RepartidoresComponent } from './repartidores.component';

import { AuthGuardService } from '../services/auth.service';

// const ventasRoutes: Routes = [
//    { path: '',   component: VentasComponent,
//     children: [
//     {path: '', component: VentasHomeComponent},
//       {path: 'clientes', component: ClientesComponent},
//       {path: 'repartidores', component: RepartidoresComponent},
  
//   //  { path: 'ventashome', component: VentasHomeComponent },
//   //  { path: 'clientes', component: ClientesComponent },
//   //  { path: 'repartidores', component: RepartidoresComponent }
//  ]}];

const ventasRoutes: Routes = [
  { path: 'ventas',   redirectTo: 'ventashome', pathMatch: 'full' },
  { path: 'ventashome', component: VentasHomeComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'repartidores', component: RepartidoresComponent },
];

@NgModule({
  imports: [RouterModule.forChild(ventasRoutes)],
  exports: [RouterModule]
})
export class VentasRoutingModule {

}
