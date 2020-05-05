import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/shared/header/register/register.component';
import { LoginComponent } from './components/shared/header/login/login.component';
import { ResDashboardComponent } from './components/restaurant/res-dashboard/res-dashboard.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '', 
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'restaurant/resDashboard', component: ResDashboardComponent },
  { path: 'user/dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
