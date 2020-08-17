import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard-clientes',
  template: `
   <div *ngIf="!clientes" style="text-align: center;">
         <i class="fa fa-spinner fa-spin  fa-2x"></i>
   </div>

   <mat-list>
   <h3>Comodoro</h3>
   <mat-list-item *ngFor="let cli of clientes | async">
      <h3 matLine> {{cli.descrip}} : 83</h3>
   </mat-list-item>

   <h3>Neuquen</h3>
   <mat-list-item *ngFor="let cli of clientes | async">
      <h3 matLine> {{cli.descrip}} : 83</h3>
   </mat-list-item>
   </mat-list>
  `,
  styles: [``]
})
export class DashboardClientesComponent implements OnInit {
   clientes; 

  constructor( private dataservice: DataService) { }

  ngOnInit() {
    this.clientes = this.dataservice.getClientes();
  }

}
