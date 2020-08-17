import { Component } from '@angular/core';

@Component({
  selector: 'app-impuestos',
  template: `
     <sw-tables [table]="'impuestos'" [tableDescription]="'Impuestos'">
     </sw-tables>
  `,
  styles: []
})
export class ImpuestosComponent {

}
