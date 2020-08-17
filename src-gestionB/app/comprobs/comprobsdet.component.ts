import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';

import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { GlobalsService } from '../services/globals.service';

import { ProductosListComponent } from './productos-list.component';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
   selector: 'app-comprobsdet',
   templateUrl: './comprobsdet.component.html',
   styles: [`
   .con-borde{
      border: 1px solid #969696;
      background-color: #FAFAFA;
      border-radius: 5px;
      padding: 8px;
      margin: 5px;
   }
   .alth80{
      min-height: 80px;
   }
   .alt120{
      min-height: 120px;
   }
   .alt400{
      min-height: 400px;
   }
   .tpcomprobs{
      min-width: 200px;
      max-width: 200px;
   }
   .fecha{
      min-width: 100px;
      max-width: 150px;
   }
   .ptovta{
      max-width: 75px;
      min-width: 75px;
      text-align: end;
   }
   .numero{
      margin-left: 10px;
      min-width: 115px;
      max-width: 115px;
      text-align: end;
   }
   .input-align-end{
      text-align: end;
   }
   .detalle-linea{
      font-size: 15px;
   }
   .detalle-linea-producto{
      overflow: ellipsis;
   }
   .detalle-linea-cantidad{
      text-align: end;
   }
   .detalle-linea-importe{
      text-align: end;
   }
   .cantidad-input{
      text-align: end;
      max-width: 100px;
   }
   .neto-input{
      text-align: end;
      max-width: 120px;
   }



   /* no se usan */
   .precio-form-field{
      max-width: 100px;
   }
   .precio-input{
      text-align: end;
   }

   .cantidad-form-field{
      max-width: 100px;
   }
   .total{
      text-align: end;
   }
   `]
})
export class ComprobsdetComponent implements OnInit, OnDestroy {
   @Input() tpcomprob: any;
   @Input() Id: number;

   @Output() close = new EventEmitter();
   cForm: FormGroup;
   detalle: FormArray;
   sbsComprob: Subscription;
   sbsSaveForm: Subscription;
   sbsFormChanges: Subscription;
   emptyProducto = {Id: 0, descrip: '', activo: true, rubro: {Id: 0, descrip: '', activo: true}};
   listProductsVisible = false;
   loadingComprob = false;
   productos;
   productoscomprobante = [];
   accion: string;

   constructor(private data: DataService,
               private fb: FormBuilder,
               private globals: GlobalsService) { }

   ngOnInit() {
      this.productos = this.data.getProductos();
      this.createForm();
      if (this.Id) {
         this.accion = "Editar ";
         this.loadingComprob = true;
         this.sbsComprob = this.data.getComprob(this.Id)
         .subscribe(comprob => {
            this.patchForm(comprob);
            this.totalizarComprobante();
            this.loadingComprob = false;
         });
      } else {
         this.accion = "Nuevo ";
      }

      this.sbsFormChanges = this.cForm.get('detalle')
                                .valueChanges.pipe(
                                 distinctUntilChanged()
                                )
                                .subscribe( det => this.totalizarComprobante( det ));

   }

   createForm( ) {
      const group = {};

      group['Id'] = new FormControl(0);
      group['fecha'] = new FormControl(this.globals.hoy());

      group['tpcomprob'] = new FormControl(this.tpcomprob); 
      if ( this.tpcomprob.pideProveedor){
         group['persona'] = new FormControl({Id: 0, descrip: '', activo: true}); 
      }
      if ( this.tpcomprob.pideCliente){
         group['persona'] = new FormControl({Id: 0, descrip: '', activo: true}); 
      }
      if ( this.tpcomprob.pideRepartidor){
         group['repartidor'] = new FormControl({Id: 0, descrip: '', activo: true}); 
      }
      if ( this.tpcomprob.pideDeposito){
         group['deposito'] = new FormControl({Id: 0, descrip: '', activo: true}); 
      }
      group['ptovta'] = new FormControl(0);
      group['numero'] = new FormControl(0);
      group['total'] = new FormControl(0);
      group['detalle'] = new FormArray([]);

      this.cForm = new FormGroup(group); 

   }

   patchForm(comprob) {
      this.cForm.patchValue( comprob );
      this.detalle = this.cForm.get('detalle') as FormArray;
      for ( let i = 0; i < comprob.detalle.length; i++) {
         this.detalle.push(this.newItem( comprob.detalle[i] ));

      }
   }
   totalizarComprobante( det? ) {
      if (!det){
         det = this.cForm.get('detalle').value;
      }
      var _totalComprobante: number = 0;
      for ( let n = 0; n < det.length; n++) {
         _totalComprobante = _totalComprobante + det[n].cantidad * det[n].neto;
      }
      this.cForm.patchValue( {total: _totalComprobante});
   }
  addItem(): void {
    this.detalle = this.cForm.get('detalle') as FormArray;
    this.detalle.push(this.newItem());
  }

  newItem(detalle?): FormGroup {
     if (detalle) {
        return this.fb.group({
              producto: detalle.producto,
              neto: detalle.neto,
              cantidad: detalle.cantidad,
              impuestos: 0
           });

     } else {
        return this.fb.group({
              producto: this.emptyProducto,
              precio: 0,
              cantidad: 1,
              impuestos: 0
           });

     }
   }

   delItem(i) {

   }

   itemSelected( producto , i) {
      this.cForm.get('detalle')['controls'][i].value.producto = producto;
   }
   itemDeleted(i) {
      this.cForm.get('detalle')['controls'][i].value.producto = this.emptyProducto;
   }

   personaSelected( persona ) {
      this.cForm.get('persona').patchValue( persona );
   }
   personaDeleted( ) {
      this.cForm.get('persona').patchValue( null );
   }

   depositoSelected( deposito) {
      this.cForm.get('deposito').patchValue( deposito );
   }

   depositoDeleted( ) {
      this.cForm.get('deposito').patchValue( null );
   }

   repartidorSelected( repartidor) {
      this.cForm.get('repartidor').patchValue( repartidor );
   }

   repartidorDeleted( ) {
      this.cForm.get('repartidor').patchValue( null );
   }

   tpcomprobSelected( tpcomprob) {
      this.cForm.get('tpcomprobs').patchValue( tpcomprob );
   }
   tpcomprobDeleted( ) {
      this.cForm.get('tpcomprobs').patchValue( null );
   }

   saveForm() {
      const _fecha = new Date( this.cForm.get('fecha').value).toUTCString();
      this.cForm.patchValue( {fecha: _fecha});
      console.log( this.cForm.value );
      this.sbsSaveForm = this.data.saveComprob( this.cForm.value )
                             .subscribe( data => {
                                 this.close.emit();
                             });
                             
   }

   closeForm() {
      this.close.emit();
   }

   listarProductos() {
      this.productoscomprobante = [];
      this.detalle = this.cForm.get('detalle') as FormArray;
      for ( let n = 0; n < this.detalle.length; n++) {
         this.productoscomprobante.push( this.detalle.value[n].producto);
      }
      this.listProductsVisible = true;
   }

   refreshProductos( prodlist ) {
      this.listProductsVisible = false;
      this.detalle = this.cForm.get('detalle') as FormArray;

      for ( const x of this.detalle.value ) {
         x.procesado = false;
      }

      // prodlist.forEach(element => {
      //    const _det = this.detalle.value.filter( el => el.producto.Id === element.Id);
      //    if ( _det.length > 0) {
      //       _det.procesado = true;
      //    } else {
      //       const detalleitem = {
      //          producto: element,
      //          neto: 100,
      //          cantidad: 1,
      //          procesado: true,
      //       };
      //       this.detalle.push(this.newItem( detalleitem ));
      //    }
      // });
      
      // or ( const n of prodlist ) {
      for ( let n = 0; n < prodlist.length; n++ ) {
         const _det = this.detalle.value.filter( el => el.producto.Id === prodlist[n].Id);
         if ( _det.length > 0) {
            _det.procesado = true;
         } else {
            // let detalleitem = {
            //    producto: prodlist[n],
            //    neto: 100,
            //    cantidad: 1,
            //    procesado: true,
            // };
            this.detalle.push(this.newItem( { producto: prodlist[n],
                                              neto: 100,
                                              cantidad: 1,
                                              procesado: true,
                                            })
            );
         }
      };

      for ( let n = 0; n < this.detalle.value.length; n++ ) {
         if (this.detalle.value[n].procesado === false) {
            this.detalle.removeAt(n);
         }
      }
      
      for ( const x of this.detalle.value ) {
         delete x.procesado;
      }

   }

   ngOnDestroy() {
      if (this.sbsComprob) {
         this.sbsComprob.unsubscribe();
      }

      if ( this.sbsSaveForm ) {
         this.sbsSaveForm.unsubscribe();
      }

      if ( this.sbsFormChanges ) {
         this.sbsFormChanges.unsubscribe();
      }
   }
}
