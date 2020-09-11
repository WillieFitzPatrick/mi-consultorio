import { Component, Input, Inject, OnInit, HostListener } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'autocomplete-list',
  template: `
      <h2>{{data.title}}</h2>
      <div style="height: 10px;">
      </div>
      <div>
           <div *ngFor = "let option of options; let i = index;" 
                 (click)="selectThis(option)" 
                 (mouseover)="selectedIndex = i"
                 [class.selectedClass] = "i == selectedIndex"
                 [class.notSelectedClass] = "i != selectedIndex">

               {{option.descrip}}

           </div>
      </div>
      <div style="height: 10px;">
      </div>     

  `,
  styles: [`
         h2 {
            font: 400 30px/1.5 Helvetica, Verdana, sans-serif;
            margin: 0;
            padding: 0;
         }
        .selectedClass {
            font: 200 18px/1.5 Helvetica, Verdana, sans-serif;
            border-bottom: 1px solid #ccc;           
            font-size: 24px;
            background: #f6f6f6;
            padding: 2px;
         }
         .notSelectedClass {
            font: 200 18px/1.5 Helvetica, Verdana, sans-serif;
            border-bottom: 1px solid #ccc;
            background-color: white;
            padding: 2px;
        }
        .selectedClass:first-child {
          border-top: 1px solid lightgray;
        }
        .notSelectedClass:first-child {
          border-top: 1px solid lightgray;
        }
        .notSelectedClass:last-child {
          border-bottom: 0px solid lightgray;
        }
  `]
})

export class AutocompleteListComponent implements OnInit {
 
   options = [];
   optionSelected = {};
   selectedIndex = 0;
   optionsCount = 0;

   constructor( public dialogRef: MatDialogRef<AutocompleteListComponent>,
                  @Inject(MAT_DIALOG_DATA) public data: any) { }

   @HostListener('document:keyup', ['$event'])
      keyEvent(event: KeyboardEvent) {
         //console.log(event);
         if (event.keyCode === 40) {
            // Arrow Down
            this.moveDown();
         } else if (event.keyCode === 38) {
            // Arrow Up
            this.moveUp();
         } else if (event.keyCode === 13) {
            // Enter
            //this.optionSelected = this.options[this.selectedLiValue];
            this.dialogRef.close( this.options[this.selectedIndex] );
         } else if (event.keyCode === 27) {
            // Escape
            this.dialogRef.close({});
         }      
      }
  
  moveDown() {
    this.selectedIndex = 
    (this.selectedIndex < this.optionsCount) ? this.selectedIndex + 1 : 0;
  }
  moveUp() {
    this.selectedIndex = 
    (this.selectedIndex > 0 ) ? this.selectedIndex - 1 : this.optionsCount;
  }

  ngOnInit() {
     if (this.data.options){
        this.options = this.data.options;
        this.optionsCount = this.options.length -1;
        this.optionSelected = this.options[0];
     }
  }

  selectThis( option ) {
    //this.optionSelected = option;
    this.dialogRef.close( option );
  }

  onNoClick(): void {
    this.dialogRef.close( {} );
  }
}


