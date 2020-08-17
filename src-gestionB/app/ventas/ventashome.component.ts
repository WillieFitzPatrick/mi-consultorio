import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-ventashome',
   template: `
      <mat-card>
      <i class="fa fa-arrow-left menu-return-button" (click)="goto('/home')"></i>
      <button mat-button (click)="goto('./repartidores')">Repartidores</button>
      <button mat-button (click)="goto('./clientes')">Clientes</button>
      <button mat-button (click)="goto('./comprobs/2')">Comprobantes Repartidor</button>
      </mat-card>
   `,
   styles: [``]
})
export class VentasHomeComponent {

   constructor(private router: Router) { }

   // goto(componentName: string) {
   //    this.router.navigate([componentName]);
   // }
   goto( moduleName: string ) {
      if (moduleName === 'comprobs') {
         const id: number = 2;
         this.router.navigate(['/comprobs', id]);
      } else {
         this.router.navigate([moduleName]);
      }
   }
}
