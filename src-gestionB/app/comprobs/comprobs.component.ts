import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { zip } from 'rxjs';

import { DataService } from '../services/data.service';
import { MenuTitleService } from '../services/menu-title.service';

@Component({
   selector: 'app-comprobs',
   templateUrl: './comprobs.component.html',
   styleUrls: ['./comprobs.component.scss'],
   host: {
      '(document:keyup)': 'onDocumentKeyUp($event)'
    }
})
export class ComprobsComponent implements OnInit, OnDestroy {

   comprobs;
   tpcomprob;
   httpError;

   _tpcomprob;
   showForm: Boolean = false;
   showDialog: Boolean = false;

   selectedId = 0;
   selectedIndex = 0;
   selectedComprob: any;

   tpcomprobsId: number;
   comprobsCount;
   title: string = "";

   private sbsRoute: Subscription;
   private sbsComprobs: Subscription;

   constructor(private data: DataService,
               private router: Router,
               private route: ActivatedRoute,
               private menutitle: MenuTitleService ) { }

   ngOnInit() {
      this.sbsRoute = this.route.params.subscribe(params => {
         this.tpcomprobsId = +params['id']; // (+) converts string 'id' to a number
         this.menutitle.setTitle("Comprobantes");
         
         const  tpcomprob$ = this.data.getTPComprob( this.tpcomprobsId);
         const  comprobs$ = this.data.getComprobs(this.tpcomprobsId); 

         this.sbsComprobs = zip(tpcomprob$, comprobs$, (tpcomprob: any, comprobs: any) => ({tpcomprob, comprobs}))
                           .subscribe(pair => {
                              this.tpcomprob = pair.tpcomprob;
                              this.comprobs = pair.comprobs;
                              this.comprobsCount = this.comprobs.length -1;
                              //this.selectedComprob = this.comprobs[0];
                              //this.menutitle.setTitle("Comprobantes : " + this.tpcomprob.descrip)
                              this.title = this.tpcomprob.descrip
            },
            error => {this.httpError = error ;})
      });
   }
   onDocumentKeyUp(event: KeyboardEvent) {
      //console.log(event.keyCode);
      if (event.keyCode === 40) {
         // Arrow Down
         this.moveDown();
      } else if (event.keyCode === 38) {
         // Arrow Up
         this.moveUp();
      } else if (event.keyCode === 13) {
         // Enter
      } else if (event.keyCode === 32) {
         // Space Bar
         this.showDialog = true;
      } else if (event.keyCode === 27) {
         // Escape
      } 
  
   }               


   
   moveDown() {
      console.log(this.comprobsCount);
      this.selectedIndex = 
      (this.selectedIndex < this.comprobsCount) ? this.selectedIndex + 1 : 0;
   }
   moveUp() {
      console.log(this.comprobsCount);
      this.selectedIndex = 
      (this.selectedIndex > 0 ) ? this.selectedIndex - 1 : this.comprobsCount;
   }
         


   

   selectComprob ( comprob: any, index: number ) {
      this.selectedId = this.selectedId === comprob.Id ? 0 : comprob.Id;
      this.selectedComprob = this.selectedComprob === comprob ? null : comprob;
      this.selectedIndex = this.selectedIndex === index ? 0 : index;
   }

   addComprob( _tpcomprob ) {
      this.selectedId = 0;
      this._tpcomprob = _tpcomprob;
      this.showForm = true;
   }

   editComprob(_tpcomprob) {
      if (this.selectedId ) {
         this._tpcomprob = _tpcomprob;
         this.showForm = true;
      }
   }

   f_closeComprobs() {
      this.router.navigate(['/home']);
   }

   closeComprobdet() {
      //this.selectedId = 0;
      // TODO: recargar los comprobantes
      this.showForm = false;
   }
   closeComprobDialog(){
      this.showDialog = false;
   }
   ngOnDestroy() {
      if ( this.sbsRoute ) {
         this.sbsRoute.unsubscribe();
      }
      if ( this.sbsComprobs ) {
         this.sbsComprobs.unsubscribe();
      }
    }
}
