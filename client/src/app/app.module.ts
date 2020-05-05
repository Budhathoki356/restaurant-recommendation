import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/shared/header/login/login.component';
import { RegisterComponent } from './components/shared/header/register/register.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ResDashboardComponent } from './components/restaurant/res-dashboard/res-dashboard.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { SerachComponent } from './components/user/dashboard/serach/serach.component';
import { RecommendationComponent } from './components/user/dashboard/recommendation/recommendation.component';
import { SuggestionComponent } from './components/user/dashboard/suggestion/suggestion.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ResDashboardComponent,
    DashboardComponent,
    SerachComponent,
    SuggestionComponent,
    RecommendationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
