import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { baseField } from './field-base';


@Component({
  selector: 'sw-field',
  templateUrl: './sw-field.component.html',
  styles:[`
  .full-width{
     width: 100%;
  }
  .date-width{
     width: 200px;
  }
  .number-width{
     width: 200px;
  }
  .autocomplete-width{
     width: 50%;
  }
  .searching{
     font-size: 10px;
     color: red;
  }
  .delete{
     font-size: 10px;
     color: blue;
  }
  `]
})
export class SwFieldComponent implements OnInit {
  @Input() field: baseField<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.field.key].valid; }
  hasError( error: string ) { return this.form.controls[this.field.key].hasError( error ); }

  constructor( private http: HttpClient) {
  }

  ngOnInit() {
  }

  optionSelected( option ) {
    this.form.controls[this.field.key].patchValue( option );
  }
}
