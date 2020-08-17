import { Component } from '@angular/core';
import { tableFilterDefinition } from '../models/swTables.models';

@Component({
  selector: 'app-clientes',
  template: `
     <sw-tables table="personas" [oFilter]="_filter" tableDescription="Clientes">
     </sw-tables>
  `,
  styles: []
})
export class ClientesComponent {
   _filter: tableFilterDefinition = { column: 'clase', value: 'C'};
}
