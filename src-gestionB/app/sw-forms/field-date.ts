import { baseField } from './field-base';

export class dateField extends baseField<string> {
   controlType = 'datefield';
   
   constructor(options: {} = {}) {
     super(options);
   }
}
