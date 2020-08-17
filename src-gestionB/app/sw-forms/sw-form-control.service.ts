import { Injectable } from '@angular/core';
import { GlobalsService } from '../services/globals.service';

import { baseField } from './field-base';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Injectable()
export class SwFormControlService {

  constructor( private globals: GlobalsService ) { }

  toFormGroup(fields: baseField<any>[], mode: string, data: any ) {
    const group: any = {};

    fields.forEach(field => {

       if (field.type === 'text') {
         field.value = data[field.key] || '';
         group[field.key] = field.required ? new FormControl(field.value || '', Validators.required)
                                           : new FormControl(field.value || '');
      }
      
      if (field.type === 'boolean') {
         field.value = data[field.key] || false;
         group[field.key] = new FormControl(field.value || false);
      }

      if (field.type === 'autocomplete') {
         group[field.key] = new FormGroup({});
         const _showValue = (data[field.key]) ? data[field.key][field.data.show] : '';
         const _idValue = (data[field.key]) ? data[field.key][field.data.id] : '';
         group[field.key].addControl( field.data.show, new FormControl(_showValue));
         group[field.key].addControl( field.data.id, new FormControl(_idValue));

      }

      if (field.type === 'email') {
         field.value = data[field.key] || '';
         group[field.key] = new FormControl(field.value || '', [Validators.required, Validators.pattern(EMAIL_REGEX)])
      }

      if (field.type === 'date') {
         field.value = data[field.key] || this.globals.hoy(); 
         group[field.key] = field.required ? new FormControl(field.value || this.globals.hoy(), Validators.required)
         : new FormControl(field.value || this.globals.hoy());
      }
      if (field.type === 'number') {
         const validators: any[] = [];
         field.value = data[field.key] || '0.00';
         if (field.required) {
            validators.push(Validators.required);
         }
         if (field.min) {
            validators.push(Validators.min(field.min));
         }
         if (field.max) {
            validators.push(Validators.max(field.max));
         }
          group[field.key] = new FormControl(field.value || '0.00', validators);
       }
    });
    return new FormGroup(group);
  }
}



