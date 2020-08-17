import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SwFormControlService } from './sw-form-control.service';
import { SwFormsService } from './sw-forms.service';
import { baseField } from './field-base';
import { tableFilterDefinition } from '../models/swTables.models';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'sw-form',
  template: `

          <div class="container">
          <div class="title">
               <i class="fa fa-arrow-left menu-return-button" (click)="f_cancelar()"></i>
              {{formMode==='new' ? "Nuevo " : "Editar "}} <strong>{{singularName}}</strong>
            </div>
            <div fxLayout="row">
              <div fxFlex>
                <div class="form-container">
                  <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
                    <div *ngFor="let field of fields" class="form-row">
                      <sw-field [field]="field" [form]="form"></sw-field>
                    </div>
                    <!-- 
                        <div style="border: 1px solid red;">
                        Errors : {{form.errors | json}}
                        </div>
                        <div style="border: 1px solid red;">
                        Valid : {{form.valid}}
                        </div>
                    -->
                    <div class="actions">
                          <div fxLayout="row">
                            <div fxFlex="50px">
                                <button mat-button *ngIf="formMode!='new'"
                                                   color="warn"
                                                   type="button"
                                                   (click)="f_eliminar()">
                                    Eliminar {{singularName.toLowerCase()}}
                                </button>
                            </div>
                            <div fxFlex>
                                <button mat-button type="submit" [disabled]="!form.valid">Grabar</button>
                                <button mat-button type="button" (click)="f_cancelar()">Cancelar</button>
                            </div>
                          </div>
                    </div>
                  </form>
                  
                </div>
              </div>
            <div>
            <div>
`,
  styles: [`
            .container {
              padding: 50px;
              margin: 60px;
              border: 1px solid black;
            }
            .title {
              margin-top: 30px;
              margin-left: 30px;
              font-family: lato;
              font-size: 22px;
              text-align: left;
            }
            .form-container {
              padding: 30px;
            }
            .text-width {
              width: 100%;
            }
            .no-width {
                width: 0%;
            }
            .actions {
                margin-top: 40px;
                text-align: end;
                border: 1px solid darkgrey;
                min-height: 40px;
            }
  ` ],
  providers: [ SwFormControlService, SwFormsService ]
})
export class SwFormComponent implements OnInit {

  @Input() table: string;
  @Input() tableDescription: string;
  @Input() tableFilter: tableFilterDefinition;
  @Input() data: any;
  @Input() formMode: any = '';
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<any>();
  @Output() eliminar = new EventEmitter<any>();
  fields;
  form: FormGroup;
  singularName = '';

  constructor(private fcs: SwFormControlService,
              private swfs: SwFormsService ) {  }

  ngOnInit() {
    if ( this.tableDescription.slice(-2) === 'es' ) {
      this.singularName = this.tableDescription.substring(0, this.tableDescription.length - 2 );
    } else if ( this.tableDescription.slice(-1) === 's' ) {
      this.singularName = this.tableDescription.substring(0, this.tableDescription.length - 1 );
    } else {
      this.singularName = this.tableDescription;
    }

    this.fields = this.swfs.getFields( this.table );
    this.form = this.fcs.toFormGroup(this.fields, this.formMode, this.data);
    console.log(this.form);
    // Preseteo la columna del filtro, porque deberia estar oculta en el form.
    if ( this.tableFilter ) {
      let oValue = new Object;
      oValue[this.tableFilter.column] = this.tableFilter.value;
      this.form.patchValue( oValue );
    }
  }

  onSubmit() {
    this.guardar.emit( this.form.value );
  }

  f_cancelar() {
    this.cancelar.emit();
  }

  f_eliminar() {
    this.eliminar.emit();
  }
}
