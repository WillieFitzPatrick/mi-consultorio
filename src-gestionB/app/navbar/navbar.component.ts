import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/app.models';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NavbarComponent implements OnInit {
@Input() title: string;
@Input() user: User;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  options = [
    'Cotizaciones',
    'Pedidos',
    'Remitos',
    'Facturas'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.options, event.previousIndex, event.currentIndex);
  }

  menuClick( section ) {
    this.router.navigate(['/comprobs',1])
  }

}
