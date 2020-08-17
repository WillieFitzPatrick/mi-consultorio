import { baseField } from './field-base';

export class textField extends baseField<string> {
  controlType = 'textfield';

  constructor(options: {} = {}) {
   super(options);
 }
}
