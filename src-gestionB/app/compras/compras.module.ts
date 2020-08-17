import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwFormsModule } from '../sw-forms/sw-forms.module';
import { SwTablesModule } from '../sw-tables/sw-tables.module';
import { SwLibModule } from '../sw-lib/sw-lib.module';

import { ComprasRoutingModule } from './compras.routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ComprasComponent } from './compras.component';
import { ProveedoresComponent } from './proveedores.component';
import { ComprasHomeComponent } from './comprashome.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ComprasRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    SwFormsModule,
    SwTablesModule,
    SwLibModule,

  ],
  declarations: [ComprasComponent, ProveedoresComponent, ComprasHomeComponent]
})
export class ComprasModule { }
