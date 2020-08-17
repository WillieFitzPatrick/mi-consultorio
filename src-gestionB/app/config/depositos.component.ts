import { Component } from '@angular/core';

@Component({
  selector: 'app-depositos',
  template: `
     <sw-tables [table]="'depositos'" [tableDescription]="'Depósitos'">
     </sw-tables>
  `,
  styles: []
})
export class DepositosComponent {

}
