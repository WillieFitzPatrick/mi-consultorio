import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Menu } from '../models/app.models';

@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`,
  styleUrls: [`./home.component.scss`]


})
export class HomeComponent implements OnInit {
@ViewChild("searchBox") searchBox: ElementRef;
   searchResults: any[] = [];
   isSearching: boolean = false;
   isFullMenuVisible: boolean = false;
   menu: Menu[] = [];
   constructor( private ds: DataService, 
                private router: Router,
                private renderer: Renderer2) { }

   ngOnInit() {

      this.menu = [
         {title: "Pedidos", icon: 'fa-clipboard-list', link: '/comprobs/1', isFavorite: true},
         {title: "Clientes", icon: 'fa-user icon-blue', link: '/clientes', isFavorite: true},
         {title: "Proveedores", icon: 'fa-user icon-green', link: '/proveedores', isFavorite: false},
         {title: "Repartidores", icon: 'fa-user icon-red', link: '/repartidores', isFavorite: false},
         {title: "Productos", icon: ' fa-barcode', link: '/productos', isFavorite: true},
         {title: "Partes de Produccion", icon: 'fa-dolly', link: '/comprobs/2', isFavorite: true}

      ]

   }

   goTo( moduleName: string ) {
      if (moduleName === 'comprobs') {
         const id: number = 1;
         this.router.navigate(['/comprobs', id]);
      } else {
         // this.router.navigate([moduleName], {relativeTo: routeName});
          this.router.navigate([moduleName]);

         
      }
   }

   search() {
      let _search = this.searchBox.nativeElement.value;
      this.searchResults = [];
      if (_search) {
         this.isSearching = true;
         this.ds.searchTool( _search ).subscribe( 
            data => {
               this.searchResults = data;
               this.isSearching = false;
            }
         )
      }
   }
   removePlaceholder() {
      this.renderer.setAttribute(this.searchBox.nativeElement,"placeholder","")
   }
   attachPlaceholder() {
      if (this.searchBox.nativeElement.value === "") {
         this.renderer.setAttribute(this.searchBox.nativeElement,"placeholder","Buscar en gestiónB")
      }
   }
   moveToTop( event ) {
      console.log(event);
      this.isFullMenuVisible = event;
   }

}
