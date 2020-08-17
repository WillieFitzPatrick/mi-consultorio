import { Component } from '@angular/core';

@Component({
  selector: 'app-impuestos',
  template: `
     <sw-tables [table]="'presentaciones'" [tableDescription]="'Presentaciones'">
     </sw-tables>
  `,
  styles: []
})
export class PresentacionesComponent {

}
