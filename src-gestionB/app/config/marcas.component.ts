import { Component } from '@angular/core';

@Component({
  selector: 'app-marcas',
  template: `
     <sw-tables [table]="'marcas'" [tableDescription]="'Marcas'">
     </sw-tables>
  `,
  styles: []
})
export class MarcasComponent {

}
