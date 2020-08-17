import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//import { SwAutocompleteModule } from '../sw-autocomplete/sw-autocomplete.module';
import { SwFormsModule } from '../sw-forms/sw-forms.module';
import { SwTablesModule } from '../sw-tables/sw-tables.module';
import { SwLibModule } from '../sw-lib/sw-lib.module';

import { VentasRoutingModule } from './Ventas.routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { VentasComponent } from './ventas.component';
import { ClientesComponent } from './clientes.component';
import { RepartidoresComponent } from './repartidores.component';
import { VentasHomeComponent } from './ventashome.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    VentasRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    SwTablesModule,
    SwFormsModule,
    SwLibModule,
    //SwAutocompleteModule,
  ],
  declarations: [
    VentasComponent,
    ClientesComponent,
    RepartidoresComponent,
    VentasHomeComponent]
})
export class VentasModule {

}
