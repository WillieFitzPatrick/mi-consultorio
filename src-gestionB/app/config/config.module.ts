import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SwFormsModule } from '../sw-forms/sw-forms.module';
import { SwTablesModule } from '../sw-tables/sw-tables.module';
import { SwLibModule } from '../sw-lib/sw-lib.module';

import { ConfigRoutingModule } from './config.routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ConfigComponent } from './config.component';
import { ConfigHomeComponent } from './confighome.component';
import { DepositosComponent } from './depositos.component';
import { SucursalesComponent } from './sucursales.component';
import { TPComprobsComponent } from './tpcomprobs.component';
import { MarcasComponent } from './marcas.component';
import { RubrosComponent } from './rubros.component';
import { ImpuestosComponent } from './impuestos.component';
import { PresentacionesComponent } from './presentaciones.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ConfigRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    SwTablesModule,
    SwFormsModule,
    SwLibModule,
  ],
  declarations: [
     ConfigComponent,
     ConfigHomeComponent,
     DepositosComponent,
     SucursalesComponent,
     TPComprobsComponent,
     MarcasComponent,
     RubrosComponent,
     ImpuestosComponent,
     PresentacionesComponent,
   ]
})
export class ConfigModule { }
