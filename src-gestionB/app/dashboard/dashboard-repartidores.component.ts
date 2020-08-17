import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard-repartidores',
  template: `
  <div *ngIf="!repartidores" style="text-align: center;">
      <i class="fa fa-spinner fa-spin  fa-2x"></i>
  </div>


  <mat-list>
  <h3>Comodoro</h3>
  <mat-list-item *ngFor="let rep of repartidores | async">
    <h3 matLine> {{rep.descrip}} : 120 - 105 - 21</h3>
  </mat-list-item>
  <h3>Neuquen</h3>
  <mat-list-item *ngFor="let rep of repartidores | async">
    <h3 matLine> {{rep.descrip}} : 120 - 105 - 21</h3>
  </mat-list-item>
</mat-list>

  `,
  styles: [``]
})
export class DashboardRepartidoresComponent implements OnInit {
   repartidores; 

  constructor( private dataservice: DataService) { }

  ngOnInit() {
    this.repartidores = this.dataservice.getRepartidores();
  }

}
