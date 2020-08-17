import { baseField } from './field-base';

export class booleanField extends baseField<string> {
   controlType = 'booleanfield';

   constructor(options: {} = {}) {
     super(options);
   }
}
