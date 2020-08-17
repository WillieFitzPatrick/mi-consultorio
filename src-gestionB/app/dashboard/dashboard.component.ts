import { Component, OnInit } from '@angular/core';
import { DashboardStockComponent } from './dashboard-stock.component';
import { GlobalsService } from '../services/globals.service';
import { MenuTitleService } from '../services/menu-title.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   chartOptions = {
      responsive: true
    };
  
    chartData = [
      { data: [330, 600, 260, 700], label: 'Pata de Pollo' },
      { data: [120, 455, 100, 340], label: 'Pollo Premium' },
      { data: [45, 67, 800, 500], label: 'Alita de Pollo' }
    ];
  
    chartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril'];
   chartOptionsPie = {
      responsive: true
    };
  
    chartDataPie = [
      { data: [330,120,45], label: 'Febrero' },
    ];
  
    chartLabelsPie = ['Pata', 'Pollo', 'Alita'];
  
  constructor( private globals: GlobalsService,
               private menutitle: MenuTitleService) { }

  ngOnInit() {
     this.menutitle.setTitle("Panel de Control");
  }

  onChartClick(event) {
   console.log(event);
 }
  onPieClick(event) {
   console.log(event);
 }

}
