import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

export interface IOptions {
  caption?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  brd_color?: string;
  cap_color?: string;
  bg_color?: string;
  hbrd_color?: string;
  hcap_color?: string;
  hbg_color?: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'loader-button',
  template: `
  <button class="btn" [style]="cssvars" (click)="onClick($event)" [disabled]="disabled || loading ? 'disabled' : null">
      <div class="spinner" *ngIf="loading"></div>
      <div class="content" [hidden]="loading">
          {{_options.caption}}
      </div>
  </button>
  `,
  styleUrls: ['./loader-button.component.scss']
})

export class LoaderButtonComponent implements OnInit {
  @Input() caption = '';
  @Input() loading = false;
  @Input() disabled = false;

  @Input() color = '#fff';
  @Input("bg-color") bgColor = '#000';
  @Input("hbg-color") hbgColor = '';
  @Input("width") width = 'auto';
  @Input("height") height = '35px';
  @Input("font-size") fontSize = '15px';

  @Output() click: any = new EventEmitter();

  _options: IOptions;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
      this._options = { 
          caption: this.caption,
          width: this.width,
          height: this.height,
          fontSize: this.fontSize,
          cap_color: this.color,
          brd_color: this.color, 
          bg_color: this.bgColor,
          hbrd_color: (this.hbgColor) ? this.color : this.bgColor, 
          hcap_color: (this.hbgColor) ? this.color : this.bgColor,  
          hbg_color: (this.hbgColor) ? this.hbgColor : this.color, 
      };
  }

  get cssvars() {
      return this.sanitizer.bypassSecurityTrustStyle(`
          --button-width: ${this._options.width};
          --button-height: ${this._options.height};
          --button-font-size: ${this._options.fontSize};
          --button-cap-color: ${this._options.cap_color};
          --button-brd-color: ${this._options.brd_color};
          --button-bg-color: ${this._options.bg_color};
          --button-hcap-color: ${this._options.hcap_color};
          --button-hbrd-color: ${this._options.hbrd_color};
          --button-hbg-color: ${this._options.hbg_color};`
      );
  }

  onClick(e) {
      e.stopPropagation();
      this.click.emit();
  }
}
