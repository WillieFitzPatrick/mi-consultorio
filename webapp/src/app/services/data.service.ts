import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GlobalsService } from '../services/globals.service';
import { IPaciente, IVisita, ILogin, IUser } from '../models/models';


@Injectable()
export class DataService {

   constructor( private http: HttpClient,
      private globals: GlobalsService) {
   }

   doLogin(data: ILogin) {
      return this.http.post<IUser>(this.globals.getUrl() + '/login', JSON.stringify(data));
   }
   getPacientes() {
      return this.http.get<IPaciente[]>(this.globals.getUrl() + '/pacientes');
   }

   searchPacientes(searchString) {
      return this.http.get<IPaciente[]>(this.globals.getUrl() + '/pacientes?filter=' + searchString);
   }

   savePaciente(data, id) {
      if (id === 0) {
        return this.http.post(this.globals.getUrl() + '/pacientes', JSON.stringify(data));
      } else {
        return this.http.put( this.globals.getUrl() + '/pacientes/' + id, JSON.stringify(data));
      }
   }

   getVisitas() {
      return this.http.get<IVisita[]>(this.globals.getUrl() + '/visitas');
   }

   saveVisita(data, id) {

      if (id === 0) {
        return this.http.post(this.globals.getUrl() + '/visitas', JSON.stringify(data));
      } else {
        return this.http.put( this.globals.getUrl() + '/visitas/' + id, JSON.stringify(data));
      }
   }

   deleteVisita(id) {
      return this.http.delete( this.globals.getUrl() + '/visitas/' + id);
   }

   // getComprobs( tpcomprobId: number) {
   //    //console.error("Trae todos los comprobantes, deberia filtrar por tpcomprobId");
   //    return this.http.get<any[]>(this.globals.getUrl() + 'comprobs/' + tpcomprobId);
   // }
   // getComprob(Id: number) {
   //    return this.http.get<any[]>(this.globals.getUrl() + 'comprob/' + Id);
   // }
   // saveComprob( data ) {

   //    const headers = new HttpHeaders().set('Content-Type', 'application/json')
   //                                     .set('Accept', 'application/json');

   //    const body = JSON.stringify(data);
   //    return this.http.post(this.globals.getUrl() + 'comprob', body,{ headers });

   // }
   
   // getProductos() {
   //    return this.http.get<any[]>(this.globals.getUrl() + 'productos');
   // }
   // getTPComprob( tpcomprobsId: number) {
   //    return this.http.get<any[]>(this.globals.getUrl() + 'tpcomprobs/' + tpcomprobsId);
   // }
   // getStock() {
   //    return this.http.get<any[]>(this.globals.getUrl() + 'productosstock');
   // }
   // getRepartidores() {
   //    return this.http.get<any[]>(this.globals.getUrl() + 'repartidores');
   // }
   // getClientes() {
   //    return this.http.get<any[]>(this.globals.getUrl() + 'personas?clase=C');
   // }
   
}
