import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/*
      <button mat-button (click)="goto('/home')">
      <i class="fa fa-arrow-circle-o-left fa-2x"></i>
      </button>

*/
@Component({
   selector: 'app-comprashome',
   template: `
      <mat-card>
         <i class="fa fa-arrow-left menu-return-button" (click)="goto('/home')"></i>
         <button mat-button (click)="goto('./proveedores')">Proveedores</button>
      </mat-card>

   `,
   styles: [``]
})
export class ComprasHomeComponent implements OnInit {

   constructor(private router: Router) { }


   ngOnInit() {
   }

   goto(componentName: string) {
      // this.router.navigate(['compras/'+componentName]);
      this.router.navigate([componentName]);
   }

}
