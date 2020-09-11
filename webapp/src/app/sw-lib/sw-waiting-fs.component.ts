import { Component, Input } from '@angular/core';
/* 

                  <ng-content select="[message]">
                  </ng-content>  
*/

@Component({
   selector: 'app-sw-waiting-fs',
   template: `
   <div class="container">
      <img src="assets/gestionb-logo.png">
      <div class="box">
         <p><span><i class="fa fa-spinner fa-spin fa-2x"></i></span>{{waitingMessage}}</p>
      </div>
   </div>

  `,
   styles: [`
      p {
         font-size: 20px;
      }
      .container {
         align-items: center;
         display: flex;
         justify-content: center;
         height: 100%;
         width: 100%;
         min-height: 600px;
       }

      .box {
         background-color: rgba(255, 255, 255, 0.3);
         border-radius: 5px;
         font-family: sans-serif;
         text-align: center;
         line-height: 1; 
         backdrop-filter: blur(10px);  
         -webkit-backdrop-filter: blur(10px);
         max-width: 50%;
         max-height: 50%;
         padding: 20px 40px;
       }


   
  `]
})
export class SwWaitingFSComponent  {
   @Input() waitingMessage: string;

   constructor() { 

   }

}

