import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GlobalsService } from '../services/globals.service';

@Injectable()
export class DataService {

   constructor( private http: HttpClient,
      private globals: GlobalsService) {
   }

   getComprobs( tpcomprobId: number) {
      //console.error("Trae todos los comprobantes, deberia filtrar por tpcomprobId");
      return this.http.get<any[]>(this.globals.getUrl() + 'comprobs/' + tpcomprobId);
   }
   getComprob(Id: number) {
      return this.http.get<any[]>(this.globals.getUrl() + 'comprob/' + Id);
   }
   saveComprob( data ) {

      const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Accept', 'application/json');

      const body = JSON.stringify(data);
      return this.http.post(this.globals.getUrl() + 'comprob', body,{ headers });

   }
   
   getProductos() {
      return this.http.get<any[]>(this.globals.getUrl() + 'productos');
   }
   getTPComprob( tpcomprobsId: number) {
      return this.http.get<any[]>(this.globals.getUrl() + 'tpcomprobs/' + tpcomprobsId);
   }
   getStock() {
      return this.http.get<any[]>(this.globals.getUrl() + 'productosstock');
   }
   getRepartidores() {
      return this.http.get<any[]>(this.globals.getUrl() + 'repartidores');
   }
   getClientes() {
      return this.http.get<any[]>(this.globals.getUrl() + 'personas?clase=C');
   }
   searchTool( search: string) {
      return this.http.get<any[]>(this.globals.getUrl() + 'searchtool?search=' + search);
   }
   
}
