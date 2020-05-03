import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  domain: string;
  authToken;
  user;

  constructor( private http: HttpClient) { 
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
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token;
    this.user = user
  }


}
