import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwPipesModule } from '../sw-pipes/sw-pipes.module';
import { CdkTableModule } from '@angular/cdk/table';
import { MatInputModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SwFormsModule } from '../sw-forms/sw-forms.module';
import { SwTablesComponent } from './sw-tables.component';
import { SwLibModule } from '../sw-lib/sw-lib.module';


@NgModule({
  imports: [
    CommonModule,
    SwPipesModule,
    CdkTableModule,
    MatInputModule, 
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    FlexLayoutModule,
    SwFormsModule,
    SwLibModule,
  ],
  exports: [
    SwTablesComponent
  ],
  declarations: [
      SwTablesComponent,
    ]
})
export class SwTablesModule { }
