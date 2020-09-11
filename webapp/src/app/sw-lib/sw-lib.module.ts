import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// import { FlexLayoutModule } from '@angular/flex-layout';
import { SwWaitingComponent } from './sw-waiting.component';
import { SwWaitingFSComponent } from './sw-waiting-fs.component';
// import { SwModalAutocompleteComponent } from './sw-modal-autocomplete.component';
// //import { SwModalAutocompleteListComponent } from './sw-modal-autocomplete-list.component';
// import { SwModalAutocompleteDialogComponent } from './sw-modal-autocomplete-dialog.component';

// import { MatFormFieldModule,
//          MatInputModule,
//          MatDialogModule } from '@angular/material';

@NgModule({
   imports: [
      CommonModule,
      ReactiveFormsModule,
      // MatFormFieldModule,
      // MatInputModule,
      // MatDialogModule, 
      // FlexLayoutModule,
   ],
   declarations: [
      SwWaitingComponent,
      SwWaitingFSComponent,
      // SwModalAutocompleteComponent,
      // SwModalAutocompleteDialogComponent,
   ],
   entryComponents: [ 
      // SwModalAutocompleteDialogComponent
    ],
   exports: [
      SwWaitingComponent,
      SwWaitingFSComponent,
      //SwModalAutocompleteComponent,
   ]
})

export class SwLibModule { }
