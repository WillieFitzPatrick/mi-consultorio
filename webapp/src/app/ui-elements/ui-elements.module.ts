import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { LoaderButtonComponent } from './loader-button/loader-button.component';
import { HandWaitingComponent } from './hand-waiting/hand-waiting.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { WhiteBoxComponent } from './white-box/white-box.component';

@NgModule({
  declarations: [
    LoaderButtonComponent, 
    HandWaitingComponent, 
    ServerErrorComponent, 
    SvgIconComponent,
    WhiteBoxComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    LoaderButtonComponent,
    HandWaitingComponent,
    ServerErrorComponent,
    SvgIconComponent,
    WhiteBoxComponent,
  ]
})
export class UiElementsModule { }
