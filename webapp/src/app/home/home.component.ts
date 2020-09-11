import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { IPaciente } from '../models/models';
import { MenuTitleService } from '../services/menu-title.service';

@Component({
    selector: 'app-home',
    templateUrl: `./home.component.html`,
    styleUrls: [`./home.component.scss`]


})
export class HomeComponent implements OnInit {
    @ViewChild("searchBox") searchBox: ElementRef;
    searchResults: IPaciente[] = [];
    isSearching: boolean = false;
    dataError: boolean = false;
    isFullMenuVisible: boolean = false;
    pacientesTitle: string = ""
    //  menu: Menu[] = [];
    menu = [];

    constructor(private ds: DataService,
                private router: Router,
                private mts: MenuTitleService,
                private renderer: Renderer2) { }

    ngOnInit() {

        // this.menu = [
        //     { title: "Pedidos", icon: 'fa-clipboard-list', link: '/comprobs/1', isFavorite: true },
        //     { title: "Clientes", icon: 'fa-user icon-blue', link: '/clientes', isFavorite: true },
        //     { title: "Proveedores", icon: 'fa-user icon-green', link: '/proveedores', isFavorite: false },
        //     { title: "Repartidores", icon: 'fa-user icon-red', link: '/repartidores', isFavorite: false },
        //     { title: "Productos", icon: ' fa-barcode', link: '/productos', isFavorite: true },
        //     { title: "Partes de Produccion", icon: 'fa-dolly', link: '/comprobs/2', isFavorite: true }

        // ]

        this.mts.setTitle("Principal");
        this.isSearching = true;
        setTimeout( () => {
            this.searchBox.nativeElement.value = "fitz";
            this.search();
        },100)



    }

    goTo(moduleName: string) {
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
        this.dataError = false;

        if (_search) {
            this.searchResults = [];
            this.isSearching = true;
            this.ds.searchPacientes(_search).subscribe(
                data => {
                    this.searchResults = data;
                    
                    setTimeout( () => { 
                        this.isSearching = false;
                    },500)

                    this.pacientesTitle = `${this.searchResults.length} pacientes encontrados con "${_search}"`
                },
                    (error) => {
                        this.isSearching = false;
                        // this.status.isLoadingMore = false;
                        this.dataError = true;
                });

            //this.searchBox.nativeElement.value = "fitz";

            // setTimeout( () => {
            //     this.isSearching = false;
            // },500)
        }
    }
    removePlaceholder() {
        this.renderer.setAttribute(this.searchBox.nativeElement, "placeholder", "")
    }
    attachPlaceholder() {
        if (this.searchBox.nativeElement.value === "") {
            this.renderer.setAttribute(this.searchBox.nativeElement, "placeholder", "Buscar paciente")
        }
    }
    moveToTop(event) {
        console.log(event);
        this.isFullMenuVisible = event;
    }

}
