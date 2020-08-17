import { Component } from '@angular/core';

@Component({
  selector: 'app-precios',
  template: `
     <sw-tables [table]="'precios'" [tableDescription]="'Precios'">
     </sw-tables>
  `,
  styles: []
})
export class PreciosComponent  {

}
