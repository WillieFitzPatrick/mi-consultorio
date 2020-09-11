import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
   selector: 'app-sw-waiting',
   template: `
    <div class="waiting-container" *ngIf="show">
        <i class="fa fa-spinner fa-spin fa-2x"></i>
        <p>{{msg}}</p>
    </div>
  `,
   styles: [`
      .waiting-box{
         border: 1px solid black; 
         width: 300px; 
         max-width: 300px;
         margin-top: 20px;
         min-height: 80px;
         max-height: 80px;
         padding: 30px;
         font-size: 18px;
      }
      .waiting-container{
         width: 100%; 
         height: 100%;
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         font-size: 18px;
      }`],
      changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwWaitingComponent  {
@Input("show") show: boolean;
@Input("message") msg: string;

   constructor() { 

   }

}

