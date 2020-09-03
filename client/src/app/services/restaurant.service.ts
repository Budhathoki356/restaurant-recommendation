import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  domain: string;
  restaurant;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.domain = environment.apiUrl
  }

  getRestaurant() {
    return this.http.get(this.domain + '/restaurant', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }

  createRestaurant(data: any, files) {
    const formData = new FormData();
    const xhr = new XMLHttpRequest();
    // append image only if we have files
    if (files && files[0]) {
      formData.append('img', files[0], files[0].name);
    }
    // data ready for BE
    for (let key in data) {
      formData.append(key, data[key]);
    }
    let upload = new Observable((observer) => {
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            observer.next(xhr.response);
          } else {
            observer.error(xhr.response);
          }
        }
      }
    })

    let URL;
    let method;

    if (data._id) {
      URL = `${this.domain}/restaurant/${data._id}?token=Bearer ${localStorage.getItem('token')}`
      method = "PUT";
    } else {
      URL = `${this.domain}/restaurant?token=Bearer ${localStorage.getItem('token')}`
      method = "POST";
    }
    
    // xhr.open('post', `${this.domain}/restaurant?token=Bearer ${localStorage.getItem('token')}`, true);
    
    xhr.open(method, URL, true);
    xhr.send(formData);

    return upload;
  }

  getById(id: string) {
    return this.http.get(this.domain + '/restaurant/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }

  remove(id) {
    return this.http.delete(this.domain + '/restaurant/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }

}
