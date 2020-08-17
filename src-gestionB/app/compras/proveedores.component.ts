import { Component } from '@angular/core';
import { tableFilterDefinition } from '../models/swTables.models';

@Component({
  selector: 'app-proveedores',
  template: `
     <sw-tables table="personas" [oFilter]="_filter" tableDescription="Proveedores">
     </sw-tables>
  `,
  styles: []
})
export class ProveedoresComponent {
   _filter: tableFilterDefinition = { column: 'clase', value: 'P'};
}
