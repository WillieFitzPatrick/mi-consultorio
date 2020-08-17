import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-dashboard-stock',
  template: `
  <div *ngIf="!stock" style="text-align: center;">
      <i class="fa fa-spinner fa-spin fa-2x"></i>
  </div>


  <mat-list>
  <h3>Comodoro</h3>
  <mat-list-item *ngFor="let prod of stock | async">
    <h3 matLine> {{prod.producto.descrip}} : {{prod.cantidad}}</h3>
  </mat-list-item>
  
  <h3>Neuquen</h3>
  <mat-list-item *ngFor="let prod of stock | async">
    <h3 matLine> {{prod.producto.descrip}} : {{prod.cantidad}}</h3>

  </mat-list-item>
</mat-list>

  `,
  styles: [``]
})
export class DashboardStockComponent implements OnInit {
  stock; 

  constructor( private dataservice: DataService) { }

  ngOnInit() {
    this.stock = this.dataservice.getStock();
  }

}
