import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventarioComponent } from './inventario.component';
import { InventarioHomeComponent } from './inventariohome.component';
import { RubrosComponent } from './rubros.component';
import { ProductosComponent } from './productos.component';
import { PreciosComponent } from './precios.component';

import { AuthGuardService } from '../services/auth.service';

const productosRoutes: Routes = [
   { path: 'inventario',   redirectTo: 'inventariohome', pathMatch: 'full' },
   { path: 'inventariohome', component: InventarioHomeComponent },
   { path: 'rubros', component: RubrosComponent },
   { path: 'productos', component: ProductosComponent },
   { path: 'precios', component: PreciosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(productosRoutes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
