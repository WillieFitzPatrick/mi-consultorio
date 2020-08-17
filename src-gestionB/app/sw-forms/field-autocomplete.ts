import { baseField } from './field-base';

export class autocompleteField extends baseField<string> {
   controlType = 'autocompletefield';

   constructor(options: {} = {}) {
     super(options);
   }
}
