import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-inventariohome',
   template: `
   <mat-card>
      <i class="fa fa-arrow-left menu-return-button" (click)="goto('/home')"></i>
      <button mat-button (click)="goto('./rubros')">Rubros</button>
      <button mat-button (click)="goto('./productos')">Productos</button>
      <button mat-button (click)="goto('./precios')">Precios</button>
      <button mat-button (click)="goto('/home')">Volver</button>
   </mat-card>
`,
styles: [``]
})
export class InventarioHomeComponent implements OnInit {

   constructor(private router: Router) { }


   ngOnInit() {
   }

   goto(componentName: string) {
      this.router.navigate([componentName]);
   }
}
