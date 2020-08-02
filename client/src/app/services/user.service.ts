import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  domain = environment.apiUrl

  constructor(private http: HttpClient,
    private router: Router) { }

    getUserProfile() {
      return this.http.get(this.domain + '/user/profile', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      });
    }
}
