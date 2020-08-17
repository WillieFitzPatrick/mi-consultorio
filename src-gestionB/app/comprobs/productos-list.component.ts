import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
   selector: 'app-productos-list',
   template: `
   <div fxLayout="row" style="margin-top: 20px;">
      <div fxFlex="50">
         <h2> Productos seleccionados : {{selected.length}}</h2>
      </div>
      <div fxFlex="50" fxLayoutAlign="end">
         <button mat-button *ngIf="!isSelected(prod)" (click)="close(true)">
            <i class="fa fa-check-circle fa-2x" style="color: green;"></i>
            <span>Aceptar</span>
         </button>
         <button mat-button *ngIf="!isSelected(prod)" (click)="close(false)">
            <i class="fa fa-times-circle fa-2x" style="color: red;"></i>
            <span>Cancelar</span>
         </button>
      </div>
   </div>

   <div fxLayout="row" fxLayoutAlign="space-around" style="margin-top: 20px;">
      <div fxFlex="22" *ngFor="let prod of productos | async">
         <mat-card style="min-height: 300px; max-height: 300px;">

            <mat-card-content style="min-height: 250px; max-height: 250px;">
               <div fxLayout="row" style="min-height: 160px; max-height: 160px;">
                  <div fxFlex="100">
                  <div class="producto-image-container">

                     <img class="producto-image" src="assets/prod-images/{{prod.Id}}.jpg"
                           onError="this.src='assets/prod-images/no-image.jpg';"  alt="Imagen No Disponible" />

                     </div>
                  </div>
               </div>
               <div fxLayout="row">
                  <div fxFlex="100">
                     <div>Producto : {{prod.descrip}}</div>
                     <div>Rubro : {{prod.rubro.descrip}}</div>
                     <div>Marca : {{prod.marca.descrip}}</div>
                     <div>Presentación : {{prod.presentacion.descrip}}</div>
                  </div>
               </div>
            </mat-card-content>
            <mat-card-actions align="center">

               <button mat-button *ngIf="!isSelected(prod.Id)" (click)="add(prod)">
                  <i class="fa fa-check-circle fa-2x" style="color: green;"></i>
                  <span>Seleccionar</span>
               </button>
               <button mat-button *ngIf="isSelected(prod.Id)" (click)="delete(prod)">
                  <i class="fa fa-times-circle fa-2x" style="color: red;"></i>
                  <span>Eliminar</span>
               </button>

            </mat-card-actions>
         </mat-card>
      </div>
   </div>
   
   `,
   styles: [`
      .producto-image-container {
         width:202px;
         height=152px;
         min-width:202px;
         min-height=152px;
         max-width:202px;
         max-height=152px;
      }
      .producto-image {
         width:200px;
         height=150px;
      }
   `]
})
export class ProductosListComponent implements OnInit {
@Input() productos: any;
@Input() productoscomprobante: any;
@Output() select = new EventEmitter<any>();
   selected = [];
   prod;

   constructor() { }

   ngOnInit() {
      this.selected = [];
      for ( let n = 0; n < this.productoscomprobante.length; n++) {
         this.selected.push( this.productoscomprobante[n]);
      }
   }

   add( prod ) {
      this.selected.push( prod );
   }

   delete( prod ) {
      if (prod) {
         this.selected = this.selected.filter( e => e.Id !== prod.Id );
      }
   }

   isSelected( id ) {
      if (id) {
         return (this.selected.filter( e => e.Id === id ).length > 0);
      }
      return false;
   }

   close( accept: boolean) {
      if (accept) {
         this.select.emit( this.selected );
      } else {
         this.select.emit( [] );
      }
   }

}
