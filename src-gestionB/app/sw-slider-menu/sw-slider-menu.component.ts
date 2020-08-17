import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Menu } from '../models/app.models';

@Component({
  selector: 'sw-slider-menu',
  templateUrl: './sw-slider-menu.component.html',
  styleUrls: ['./sw-slider-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SwSliderMenuComponent implements OnInit {
@Input("menu") menu: Menu[] = [];
@Input("full") full: boolean = false;
@Output() onOpenLink:EventEmitter<string>  = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
  }

  emitAction( link: string) {
    this.onOpenLink.emit(link)
  }

}
