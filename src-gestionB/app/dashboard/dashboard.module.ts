import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';


import { DashboardComponent } from './dashboard.component';
import { DashboardStockComponent } from './dashboard-stock.component';
import { DashboardRepartidoresComponent } from './dashboard-repartidores.component';
import { DashboardClientesComponent } from './dashboard-clientes.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    FlexLayoutModule,
    ChartsModule,
  ],
  declarations: [
     DashboardComponent,
     DashboardStockComponent,
     DashboardRepartidoresComponent,
     DashboardClientesComponent,
   ]
})
export class DashboardModule { }
