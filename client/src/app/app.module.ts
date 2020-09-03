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
import { AuthGuard } from './guard/auth.guard';
import { NotAuthGuard } from './guard/notAuth.guard';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { UserService } from './services/user.service';
import { CuisineComponent } from './components/restaurant/cuisine/cuisine.component';
import { ResInfoComponent } from './components/restaurant/res-info/res-info.component';
import { CreateComponent } from './components/restaurant/res-info/create/create.component';
import { EditComponent } from './components/restaurant/res-info/edit/edit.component';


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
    RecommendationComponent,
    ProfileComponent,
    CuisineComponent,
    ResInfoComponent,
    CreateComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuard, NotAuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
