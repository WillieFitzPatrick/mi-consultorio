import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GlobalsService } from '../services/globals.service';
import { tableFilterDefinition } from '../models/swTables.models'; 

@Injectable()
export class SwTablesService {
   _table: string;
   _oFilter: tableFilterDefinition;
   
   constructor( private http: HttpClient,
                private globals: GlobalsService) {
   }

   setTable( table: string)   {
         this._table = table;
   }

   setTableFilter( oFilter: tableFilterDefinition) {
         this._oFilter = oFilter;
   }

   getSwTableData(table: string) {
      let filter = '';
      if ( this._oFilter ) {
         filter = '?' + this._oFilter.column + '=' + this._oFilter.value;
      }
      return this.http.get<any[]>(this.globals.getUrl() + table + filter);
   }

   getSwTableRow(table: string, Id: number ) {
      return this.http.get<any[]>(this.globals.getUrl() + table + '/' + Id);
   }

   getSwTableDefinition() {
      return this.http.get('assets/data-models/' + this._table + '.json')
   }

   saveNewData(table: string, data: any) {
         const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                          .set('Accept', 'application/json');

         const body = JSON.stringify(data);
         return this.http.post(this.globals.getUrl() + table, body,{ headers });

   }

   saveData(table: string, data: any, Id: number ) {
         const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                          .set('Accept', 'application/json');

         const body = JSON.stringify(data);
         return this.http.put(this.globals.getUrl() + table + '/' + Id, body, { headers });

   }

   deleteData(table: string, Id: number) {
      return this.http.delete(this.globals.getUrl() + table + '/' + Id);
   }

}
