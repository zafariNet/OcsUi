import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error500Component } from './layout/errors/error-500.component';
import { ErrorComponent } from './layout/errors/error-component';
import { MainLayoutComponent } from './layout/main/main-layout.component';
import { LoginComponent } from './account/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

// const routes: Routes = [{ path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) }];
const routes: Routes = [
  { 
    path: 'main',
    component: MainLayoutComponent, 
    children: [
      { path: '', redirectTo : 'login', pathMatch : 'full' },
      { path: 'dashboard', component: DashboardComponent },
    ]
  },
  { 
    path: '',
    component: LoginComponent, 
    children: [
      { path: '', redirectTo : 'login', pathMatch : 'full' },
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: 'error',
    component : ErrorComponent,
    children : [
      { path: '', redirectTo : 'error-500', pathMatch : 'full' },
      { path: 'error-500', component: Error500Component }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
