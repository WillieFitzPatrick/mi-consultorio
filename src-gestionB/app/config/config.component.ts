import { Component, OnInit } from '@angular/core';
import { MenuTitleService } from '../services/menu-title.service';

@Component({
  selector: 'app-config',
  template: `
  <!-- <router-outlet></router-outlet> -->
  `,
  styles: []
})
export class ConfigComponent implements OnInit {

   constructor(private mts: MenuTitleService) { }

   ngOnInit() {
      this.mts.setTitle('Configuración');
   }
}
