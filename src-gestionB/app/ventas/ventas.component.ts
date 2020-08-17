import { Component, OnInit } from '@angular/core';
import { MenuTitleService } from '../services/menu-title.service';

@Component({
  selector: 'app-ventas',
  template: `
  <!-- <router-outlet></router-outlet> -->
  `,
  styles: [``]
})
export class VentasComponent implements OnInit {

   constructor(private mts: MenuTitleService) { }

   ngOnInit() {
      this.mts.setTitle('Menu Ventas');
   }
}
