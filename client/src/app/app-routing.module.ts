import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/shared/header/register/register.component';
import { LoginComponent } from './components/shared/header/login/login.component';
import { ResDashboardComponent } from './components/restaurant/res-dashboard/res-dashboard.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { NotAuthGuard } from './guard/notAuth.guard';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { ResInfoComponent } from './components/restaurant/res-info/res-info.component';
import { CuisineComponent } from './components/restaurant/cuisine/cuisine.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'restaurant/resDashboard',
    component: ResDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo:'res-info', pathMatch: 'full'},
      { path: 'res-info', component: ResInfoComponent, canActivateChild: [AuthGuard] },
      { path: 'cuisine', component: CuisineComponent, canActivateChild: [AuthGuard]  }
    ]
  },
  {
    path: 'user/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
