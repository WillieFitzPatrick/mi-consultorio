import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComprasHomeComponent } from './comprashome.component';
import { ComprasComponent } from './compras.component';
import { ProveedoresComponent } from './proveedores.component';
import { AuthGuardService } from '../services/auth.service';

const comprasRoutes: Routes = [
   { path: 'compras',   redirectTo: 'comprashome', pathMatch: 'full' },
   { path: 'comprashome', component: ComprasHomeComponent },
   { path: 'proveedores', component: ProveedoresComponent },
 ];

@NgModule({
  imports: [RouterModule.forChild(comprasRoutes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }