import { Component, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { EventEmitter, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalsService } from '../../services/globals.service';
import { AutocompleteListComponent } from './autocomplete-list.component';

import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';



@Component({
   selector: 'app-sw-modal-autocomplete',
   template: `
   <div #containerDiv>
      <mat-form-field style="width: 98%">
         <input matInput
            [formControl]="textInput"
            [placeholder]="placeholder"
            [value]="initialValue[showProp]"
            (blur)="f_onBlur()"
            (focus)="f_onFocus()"
            autocomplete="off"
            type="text">

         <span matSuffix
            style="width: 10%"
            *ngIf="isSearching && !isOptionsDialogVisible && hasFocus"
            class="searching"
            (click)="stopSearch()">
            <i class="fa fa-spinner fa-spin fa-fw"></i>
         </span>

         <span matSuffix
            style="width: 10%"
            *ngIf="!isSearching  && !isOptionsDialogVisible && hasFocus"
            class="delete"
            (click)="deleteValue()">
            <i class="fa fa-trash"></i>
         </span>

      </mat-form-field>
   </div>
  `,
   styles: [`
      .searching{
         font-size: 14px;
         color: green;
      }
      .delete{
         font-size: 14px;
         color: red;
      }

  `]
})
export class SwModalAutocompleteComponent implements OnInit, OnDestroy {
   @Input() initialValue: any;
   @Input() showProp: string;
   @Input() title: string;
   @Input() placeholder: string;
   @Input() apiCall: string;
   @Input() debug: Boolean = false;

   @Output() optionSelected = new EventEmitter<any>();
   @Output() optionDeleted = new EventEmitter<any>();
   @ViewChild('containerDiv', {static: false}) containerDiv;

   textInput: FormControl;
   optionSelectedValue: any;
   filteredData: Observable<any[]>;
   optionsSubscription: Subscription;
   
   isSearching: Boolean = false;
   isOptionsDialogVisible: Boolean = false;
   hasFocus = false;
   dialogRef;

   constructor(
      private http: HttpClient,
      public dialog: MatDialog,
      private globals: GlobalsService ) { 
   }

   ngOnInit() {
      // del objeto inicial, preseteo en el input la propiedad a mostrar indicada
      if (this.initialValue) {
         this.textInput = new FormControl(this.initialValue[this.showProp]);
      } else {
         this.textInput = new FormControl('error al inicializar');
      }

      this.optionSelectedValue = this.initialValue;
      // this.textInput.valueChanges.pipe(
      //       .debounceTime(600)
      //       .distinctUntilChanged()
      //       .subscribe(value => {
      //          this.getOptions(value);
      //       })
      //    );
      this.textInput.valueChanges.pipe(
         debounceTime(600),
         distinctUntilChanged()
      ).subscribe(value => {
            this.getOptions(value);
         }

      )
   }

   showOptionsDialog() {
      this.textInput.disable();
      this.isSearching = false;
      this.isOptionsDialogVisible = true;
      
      const _top = this.globals.getOffset( this.containerDiv).bottom + 'px';
      const _left = this.globals.getOffset( this.containerDiv).left + 5 + 'px';

      this.dialogRef = this.dialog.open(AutocompleteListComponent, {
         width: '350px',
         data: { options: this.filteredData, title: this.title || 'Seleccione un valor' },
         disableClose: true,
         hasBackdrop: false,
         position: {top: _top, left: _left}
       });

   
      this.dialogRef.afterClosed().subscribe(result => {
         this.isSearching = false;
         this.isOptionsDialogVisible = false;
         this.textInput.enable();
         if (result) {
            this.textInput.setValue(result[this.showProp]);
            this.optionSelectedValue = result;
            this.optionSelected.emit(result);
         }
      });
    }
  
    closeOptionsDialog() {
      this.textInput.setValue('');
      this.textInput.enable();
      this.isOptionsDialogVisible = false;
      if (this.dialogRef){
         this.dialogRef.close({id:0,descrip:''});
      }
    }

   public reset() {
      this.textInput.setValue('');
   }

   getOptions(value: string) {
      const query = this.globals.getUrl() + this.apiCall.replace('<term>', value.trim());
      this.isSearching = false;
      if (value && value !== this.optionSelectedValue[this.showProp]) {
         this.textInput.disable();
         this.isSearching = true;
         this.optionsSubscription = <any>this.http.get( query ).pipe(
            tap((list: any) => {
               this.isSearching = false;
               if (list.length === 1) { 
                  this.optionSelected.emit(list[0]); 
               }
               if (list.length > 1) { 
                  this.filteredData = list;
                  this.showOptionsDialog(); 
               }
            })
         ).subscribe()
         // this.optionsSubscription = this.http.get( query ).subscribe( list => {
         //    if (list.length === 1) { 
         //       this.optionSelected.emit(list[0]); 
         //    }
         //    if (list.length > 1) { 
         //       this.filteredData = list;
         //       this.showOptionsDialog(); 
         //    }
         // })
      }
   }

   f_onFocus() {
      this.hasFocus = true;
   }

   f_onBlur() {
      this.hasFocus = false;
      this.closeOptionsDialog();
   }

   // f_closePanelButton() {
   //    this.reset();
   //    this.closeOptionsDialog();
   // }

   deleteValue() {
      this.textInput.setValue('');
      this.optionDeleted.emit();
   }

   stopSearch() {
      this.textInput.setValue('');
      this.isSearching = false;
   }

   // f_optionSelected(option) {
   //    this.textInput.setValue(option[this.showProp]);
   //    this.optionSelectedValue = option;
   //    this.isSearching = false;
   //    this.textInput.enable();
   //    //  save so it doesn't show again
   //    this.optionSelected.emit(option);
   //    this.closeOptionsDialog();
   // }

   ngOnDestroy() {
   }
}

