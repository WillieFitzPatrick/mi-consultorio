import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hand-waiting',
  templateUrl: './hand-waiting.component.html',
  styleUrls: ['./hand-waiting.component.scss']
})
export class HandWaitingComponent implements OnInit {
@Input("bg-color") bgColor: string = "#4492f4";
  constructor() { }

  ngOnInit() {
  }

}
