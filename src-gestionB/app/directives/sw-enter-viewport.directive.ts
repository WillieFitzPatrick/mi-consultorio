import { Directive, ElementRef, Output, EventEmitter, AfterViewInit, AfterViewChecked } from '@angular/core';

@Directive({
  selector: '[enter-viewport]'
})
export class SwEnterViewportDirective implements AfterViewInit {
   @Output() onEnterViewport:EventEmitter<boolean> = new EventEmitter<boolean>();
   
   observer: IntersectionObserver;
lastState: boolean = false;
   constructor( private el: ElementRef) {
   }

   ngAfterViewInit() {
      let options = {rootMargin: '0px', threshold: 1.0};
      this.observer = new IntersectionObserver(this.chkElement, options);
      this.observer.observe( this.el.nativeElement )
   }

   private chkElement = (entries, observer) => {
      entries.forEach(entry => {
         // Each entry describes an intersection change for one observed
         // target element:
         //   entry.boundingClientRect
         //   entry.intersectionRatio
         //   entry.intersectionRect
         //   entry.isIntersecting
         //   entry.rootBounds
         //   entry.target
         //   entry.time
         if (entry.isIntersecting !== this.lastState) {
            this.lastState = entry.isIntersecting;
            this.onEnterViewport.emit(entry.isIntersecting);
         }
       });
      
   }

}
