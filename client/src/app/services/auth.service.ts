import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";

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
    this.domain = environment.apiUrl
  }

  registerUser(user: object) {
    return this.http.post(this.domain + '/auth/register', user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  loginUser(user: object) {
    return this.http.post(this.domain + '/auth/login', user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  logout() {
    this.authToken = null
    this.user = null
    localStorage.clear()
  }

  storeUserData(token, user) {
    this.authToken = localStorage.setItem('token', token)
    this.user = localStorage.setItem('user', JSON.stringify(user)) // stringfy
  }
  getUserData() {
    return {
      user: JSON.parse(localStorage.getItem('user')) // do this
    }
  }

  redirectToHome() {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user.role == 'restaurant') {
      setTimeout(() => {
        this.router.navigate(['/restaurant/resDashboard'])
      }, 1500)
    }
    else {
      setTimeout(() => {
        this.router.navigate(['/user/dashboard'])
      }, 1500)
    }
  }

  loggedIn() {
    return !!localStorage.getItem('token') // give true value if token exists otherwise false
  }

}
