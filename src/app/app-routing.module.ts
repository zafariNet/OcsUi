import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main/main-layout.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

// const routes: Routes = [{ path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) }];
const routes: Routes = [
  { 
    path: '',
    component: MainLayoutComponent, 
    children: [
      { path: '', redirectTo : 'dashboard', pathMatch : 'full' },
      { path: 'dashboard', component: DashboardComponent },
    ]
  },
  { 
    path: 'login',
    component: LoginComponent, 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
