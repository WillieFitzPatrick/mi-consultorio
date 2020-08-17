import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { RoutingModule } from './routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';

import { SwPipesModule } from './sw-pipes/sw-pipes.module';
import { SwFormsModule } from './sw-forms/sw-forms.module';
import { SwTablesModule } from './sw-tables/sw-tables.module';
import { SwFloatRightDirective } from './directives/sw-float-right.directive';
import { SwEnterViewportDirective } from './directives/sw-enter-viewport.directive';

import { SwLibModule } from './sw-lib/sw-lib.module';
import { ConfigModule } from './config/config.module';
import { InventarioModule } from './inventario/inventario.module';
import { ComprasModule } from './compras/compras.module';
import { VentasModule } from './ventas/ventas.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { AppComponent } from './app.component';
import { TicketsComponent } from './tickets/tickets.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ComprobsComponent } from './comprobs/comprobs.component';
import { ComprobsdetComponent } from './comprobs/comprobsdet.component';
import { ComprobDialogComponent } from './comprobs/comprob-dialog.component';
import { DatosPersonaComponent } from './comprobs/datos-persona.component';
import { ProductosListComponent } from './comprobs/productos-list.component';
import { SwSliderMenuComponent } from './sw-slider-menu/sw-slider-menu.component';

import { GlobalsService } from './services/globals.service';
import { DataService } from './services/data.service';
import { AuthGuardService } from './services/auth.service';
import { MenuTitleService } from './services/menu-title.service';
import { UserStatusService } from './services/user-status.service';


import { CustomPaginatorEs } from './custom-paginator-es';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
      AppComponent,
      TicketsComponent,
      LoginComponent,
      HomeComponent,
      ComprobsComponent,
      ComprobsdetComponent,
      ComprobDialogComponent,
      DatosPersonaComponent,
      ProductosListComponent,
      SwSliderMenuComponent,
      SwFloatRightDirective,
      SwEnterViewportDirective,
      NavbarComponent,
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      MatListModule,
      MatButtonModule,
      MatIconModule,
      MatInputModule,
      MatToolbarModule,
      MatCardModule,
      MatDialogModule,
      DragDropModule,
      FlexLayoutModule,
      ChartsModule,
      SwPipesModule.forRoot(),
      SwLibModule,
      SwTablesModule,
      SwFormsModule,
      ConfigModule,
      InventarioModule,
      ComprasModule,
      VentasModule,
      DashboardModule,
      
      RoutingModule,   /* Muy importante que se importe ultimo este modulo */
  ],
  providers: [
      AuthGuardService,
      GlobalsService,
      DataService,
      MenuTitleService,
      UserStatusService,
      DatePipe,
      { provide: MatPaginatorIntl, useClass: CustomPaginatorEs},
   ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
