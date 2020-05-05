import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  domain: string;
  authToken;
  user;
  role;

  constructor( 
    private http: HttpClient,
    private router: Router
    ) { 
    this.domain = "http://localhost:5000/auth"
  }

  registerUser(user: object) {
    return this.http.post(this.domain + '/register', user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  
  loginUser(user: object) {
    return this.http.post(this.domain + '/login', user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  
  storeUserData(token, user) {
    this.authToken = localStorage.setItem('token', token)
    this.user = localStorage.setItem('user', JSON.stringify(user))
  }

  redirectToHome() {
    let user = JSON.parse(localStorage.getItem('user'))
    if(user.role == 'restaurant')  {
      setTimeout(() => {
        this.router.navigate(['/restaurant/resDashboard'])
      }, 2000)
    }
    else {
      setTimeout(() => {
        this.router.navigate(['/user/dashboard'])
      }, 2000)
    }
  }

}
