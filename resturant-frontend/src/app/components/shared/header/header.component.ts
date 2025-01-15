import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userInfo:Object = {};
  public activeDashboard:boolean;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.activeDashboard = false
   }


  onLogoutClick() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  onProfile() {
    this.activeDashboard = true
    this.router.navigate(['/profile'])
  }

  onDashboard() {
    this.activeDashboard = false
    this.userInfo = this.authService.getUserData();
    if(this.userInfo['user']['role'] == 'customer') {
      this.router.navigate(['/user/dashboard'])
    } else {
      this.router.navigate(['/restaurant/resDashboard'])
    }
  }

  ngOnInit(): void {
    
  }

}
