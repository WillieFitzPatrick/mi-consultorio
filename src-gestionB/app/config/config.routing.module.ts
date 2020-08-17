import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigComponent } from './config.component';
import { ConfigHomeComponent } from './confighome.component';
import { DepositosComponent } from './depositos.component';
import { SucursalesComponent } from './sucursales.component';
import { MarcasComponent } from './marcas.component';
import { TPComprobsComponent } from './tpcomprobs.component';
import { RubrosComponent } from './rubros.component';
import { ImpuestosComponent } from './impuestos.component';
import { PresentacionesComponent } from './presentaciones.component';


import { AuthGuardService } from '../services/auth.service';


const configRoutes: Routes = [
   { path: 'config',   redirectTo: 'confighome', pathMatch: 'full' },
   { path: 'confighome', component: ConfigHomeComponent },
   { path: 'depositos', component: DepositosComponent },
   { path: 'sucursales', component: SucursalesComponent },
   { path: 'tpcomprobs', component: TPComprobsComponent },
   { path: 'marcas', component: MarcasComponent },
   { path: 'impuestos', component: ImpuestosComponent },
   { path: 'presentaciones', component: PresentacionesComponent }
 ];

@NgModule({
  imports: [RouterModule.forChild(configRoutes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
