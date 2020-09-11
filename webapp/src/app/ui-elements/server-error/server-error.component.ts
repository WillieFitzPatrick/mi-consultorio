import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit {
@Output() click: any = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onClick(e) {
    //e.stopPropagation();
    this.click.emit()
  }
}
