import { Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  template: `
     <sw-tables [table]="'productos'" [tableDescription]="'Productos'">
     </sw-tables>
  `,
  styles: []
})
export class ProductosComponent  {

}
