import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  // {path: 'login', component: LoginComponent},
  // {path: 'comprobs/:id', component: ComprobsComponent},
  // {path: 'dashboard', component: DashboardComponent},
  //{path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
  //{path: 'config', loadChildren: './config/config.module#ConfigModule' },
  // {path: 'config', loadChildren: () => ConfigModule  },
  // {path: 'inventario', loadChildren: () => InventarioModule  },
  // {path: 'compras', loadChildren: () => ComprasModule  },
  // {path: 'ventas', loadChildren: () => VentasModule  },


  // {path: 'inventario', loadChildren: './inventario/inventario.module#InventarioModule' },
  // {path: 'compras', loadChildren: './compras/compras.module#ComprasModule' },
  // {path: 'ventas', loadChildren: './ventas/ventas.module#VentasModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
