import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class GlobalsService {
  private _hoy: string;
  //private url = 'http://localhost:5000/api/';
  private url: string = "http://gestionb.swapps.com.ar/dataServer/api/";

  constructor(  dp: DatePipe) {
     this._hoy = dp.transform( new Date(), 'yyyy-MM-dd' );
  }

  hoy() {
     return this._hoy;
  }

  getUrl() {
     return this.url;
  }

   getOffset( el ) {
      if (el) {
         const rect = el.nativeElement.getBoundingClientRect();
         return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY,
            bottom: rect.top + rect.height + window.scrollY,
         }
      } else {
         console.warn("getOffset => el : undefined")
         return {left: 0,top: 0,bottom: 0,}
      }
   }
}
