import { baseField } from './field-base';

export class numberField extends baseField<string> {
   controlType = 'numberfield';

   constructor(options: {} = {}) {
     super(options);
   }
}
