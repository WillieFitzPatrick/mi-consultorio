import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatPaginatorIntl } from '@angular/material/paginator';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { GlobalsService } from './services/globals.service';
import { LoginService } from './services/login.service';
import { DataService } from './services/data.service';
import { AuthGuardService } from './services/auth.service';
import { MenuTitleService } from './services/menu-title.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { UiElementsModule } from './ui-elements/ui-elements.module';


import { SwLibModule } from './sw-lib/sw-lib.module';
import { PacientesListComponent } from './pacientes-list/pacientes-list.component';
import { PacientesListDataComponent } from './pacientes-list-data/pacientes-list-data.component';
import { PacienteEditFormComponent } from './paciente-edit-form/paciente-edit-form.component';
import { VisitaEditFormComponent } from './visita-edit-form/visita-edit-form.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PacientesListComponent,
    PacientesListDataComponent,
    PacienteEditFormComponent,
    VisitaEditFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    SwLibModule,
    UiElementsModule,



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
