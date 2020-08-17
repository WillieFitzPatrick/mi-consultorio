import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/auth.service';
import { ComprobsComponent } from './comprobs/comprobs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ConfigModule } from './config/config.module';
// import { InventarioModule } from './inventario/inventario.module';
// import { ComprasModule } from './compras/compras.module';
//import { VentasModule } from './ventas/ventas.module';

const routes: Routes = [
   {path: '', component: HomeComponent},
   {path: 'home', component: HomeComponent},
   {path: 'login', component: LoginComponent},
   {path: 'comprobs/:id', component: ComprobsComponent},
   {path: 'dashboard', component: DashboardComponent},
   {path: 'tickets', component: TicketsComponent},
   //{path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
   
   {path: 'config', loadChildren: 'app/config/config.module#ConfigModule' },
   //{path: 'config', loadChildren: () => ConfigModule  },

   // {path: 'inventario', loadChildren: () => InventarioModule  },
   // {path: 'compras', loadChildren: () => ComprasModule  },
   // {path: 'ventas', loadChildren: () => VentasModule  },


   // {path: 'inventario', loadChildren: './inventario/inventario.module#InventarioModule' },
   // {path: 'compras', loadChildren: './compras/compras.module#ComprasModule' },
   {path: 'ventas', loadChildren: 'app/ventas/ventas.module#VentasModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule {

}
