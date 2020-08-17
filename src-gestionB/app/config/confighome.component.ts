import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-confighome',
   template: `
   <mat-card>
      <i class="fa fa-arrow-left menu-return-button" (click)="goto('/home')"></i>
      <button mat-button (click)="goto('./sucursales')">Sucursales</button>
      <button mat-button (click)="goto('./depositos')">Depositos</button>
      <button mat-button (click)="goto('./tpcomprobs')">Tipos de Comprobantes</button>
      <button mat-button (click)="goto('./marcas')">Marcas</button>
      <button mat-button (click)="goto('./impuestos')">Impuestos</button>
      <button mat-button (click)="goto('./presentaciones')">Presentaciones</button>
   </mat-card>

`,
styles: []
})
export class ConfigHomeComponent {

   constructor(private router: Router) { }

   goto(componentName: string) {
      this.router.navigate([componentName]);
   }
}
