import { Component, OnInit } from '@angular/core';
import { MenuTitleService } from '../services/menu-title.service';

@Component({
  selector: 'app-compras',
  template: `
     <!-- <router-outlet></router-outlet> -->
  `,
  styles: [``]
})
export class ComprasComponent implements OnInit {

   constructor(private mts: MenuTitleService) { }

   ngOnInit() {
      this.mts.setTitle('Compras');
   }
}
