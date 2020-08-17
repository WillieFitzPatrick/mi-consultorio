import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { GlobalsService } from './services/globals.service';
import { LoginService } from './services/login.service';
import { DataService } from './services/data.service';
import { AuthGuardService } from './services/auth.service';
import { MenuTitleService } from './services/menu-title.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
  ],
  providers: [
    LoginService,
    AuthGuardService,
    GlobalsService,
    DataService,
    MenuTitleService,
    DatePipe,
    //{ provide: MatPaginatorIntl, useClass: CustomPaginatorEs},
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
