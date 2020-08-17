import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'app-datospersona',
   template: `
      <h4>{{ (persona.direccion ) ? 'Direccion : ' + persona.direccion : ''}}</h4>
      <h4>{{ (persona.cuit ) ? 'Cuit : ' + persona.cuit : ''}}</h4>
   `,
   styles: [`

   `]
})
export class DatosPersonaComponent {
@Input() persona: any;

   constructor() { }

}
