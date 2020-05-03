import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/shared/header/register/register.component';
import { LoginComponent } from './components/shared/header/login/login.component';
import { SearchComponent } from './components/search/search.component';


const routes: Routes = [
  {
    path: '', 
    redirectTo: '/search',
    pathMatch: 'full'
  },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
