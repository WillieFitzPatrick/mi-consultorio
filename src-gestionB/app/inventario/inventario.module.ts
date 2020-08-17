import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SwFormsModule } from '../sw-forms/sw-forms.module';
import { SwTablesModule } from '../sw-tables/sw-tables.module';
import { SwLibModule } from '../sw-lib/sw-lib.module';

import { InventarioRoutingModule } from './inventario.routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { InventarioHomeComponent } from './inventariohome.component';
import { InventarioComponent } from './inventario.component';
import { RubrosComponent } from './rubros.component';
import { ProductosComponent } from './productos.component';
import { PreciosComponent } from './precios.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    InventarioRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    SwTablesModule,
    SwFormsModule,
    SwLibModule,
  ],
  declarations: [
     InventarioComponent,
     InventarioHomeComponent,
     RubrosComponent,
     ProductosComponent,
     PreciosComponent,
   ]
})
export class InventarioModule { }
