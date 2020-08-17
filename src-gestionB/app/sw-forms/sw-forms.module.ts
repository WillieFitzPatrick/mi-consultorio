import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule,
         MatFormFieldModule,
         MatButtonModule,
         MatSlideToggleModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SwLibModule } from '../sw-lib/sw-lib.module';

import { SwFormComponent } from './sw-form.component';
import { SwFieldComponent } from './sw-field.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSlideToggleModule,
    HttpClientModule,
    FlexLayoutModule,
    SwLibModule,
  ],
  exports: [
    SwFormComponent
  ],
  declarations: [
    SwFormComponent,
    SwFieldComponent
  ],
  providers: []
})

export class SwFormsModule { }
