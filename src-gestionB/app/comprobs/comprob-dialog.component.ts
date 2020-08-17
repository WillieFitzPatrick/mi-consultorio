import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';

import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { GlobalsService } from '../services/globals.service';

import { ProductosListComponent } from './productos-list.component';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-comprob-dialog',
   templateUrl: './comprob-dialog.component.html',
   styles: [`
   .con-borde{
      border: 1px solid #969696;
      background-color: #FAFAFA;
      border-radius: 5px;
      padding: 8px;
      margin: 10px;
   }
   .alth80{
      min-height: 80px;
   }
   .alt120{
      min-height: 120px;
   }
   .alt400{
      min-height: 400px;
   }
   .tpcomprobs{
      min-width: 200px;
      max-width: 200px;
   }
   .fecha{
      min-width: 100px;
      max-width: 150px;
   }
   .ptovta{
      max-width: 75px;
      min-width: 75px;
      text-align: end;
   }
   .numero{
      margin-left: 10px;
      min-width: 115px;
      max-width: 115px;
      text-align: end;
   }
   .input-align-end{
      text-align: end;
   }
   .detalle-linea{
      font-size: 15px;
   }
   .detalle-linea-producto{
      overflow: ellipsis;
   }
   .detalle-linea-cantidad{
      text-align: end;
   }
   .detalle-linea-importe{
      text-align: end;
   }
   .cantidad-input{
      text-align: end;
      max-width: 100px;
   }
   .neto-input{
      text-align: end;
      max-width: 120px;
   }



   /* no se usan */
   .precio-form-field{
      max-width: 100px;
   }
   .precio-input{
      text-align: end;
   }

   .cantidad-form-field{
      max-width: 100px;
   }
   .total{
      text-align: end;
   }
   `]
})
export class ComprobDialogComponent implements OnInit {
   @Input() comprob: any;

   @Output() close = new EventEmitter();

   loadingComprob = false;


   constructor(private data: DataService,
               private globals: GlobalsService) { }

   ngOnInit() {


   }


   closeForm() {
      this.close.emit();
   }



}
