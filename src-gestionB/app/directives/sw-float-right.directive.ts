import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSwFloatRight]'
})
export class SwFloatRightDirective {

   constructor(el: ElementRef) {
      el.nativeElement.style.float = 'right';
      //el.nativeElement.style.textAlign = 'right';
   }

}
