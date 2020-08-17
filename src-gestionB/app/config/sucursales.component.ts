import { Component } from '@angular/core';

@Component({
  selector: 'app-sucursales',
  template: `
     <sw-tables [table]="'sucursales'" [tableDescription]="'Sucursales'">
     </sw-tables>
  `,
  styles: []
})
export class SucursalesComponent {

}
