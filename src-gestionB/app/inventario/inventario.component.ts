import { Component, OnInit} from '@angular/core';
// import { Router, RouterModule } from '@angular/router';

import { MenuTitleService } from '../services/menu-title.service';
/*
   <mat-toolbar color="primary">
      <span>GestiónB . Inventario</span>
   </mat-toolbar>
*/

@Component({
  selector: 'app-inventario',
  template: `
  <!-- <router-outlet></router-outlet> -->
`,
styles: []
})
export class InventarioComponent implements OnInit {

   constructor( private mts: MenuTitleService ) {

   }

   ngOnInit() {
      this.mts.setTitle('Inventario');
   }

}

