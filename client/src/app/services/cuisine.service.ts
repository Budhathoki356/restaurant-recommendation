import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuisineService {

  domain: string;

  constructor(
    private http: HttpClient,
  ) {
    this.domain = environment.apiUrl;
  }
   
  search(condition: any) {
    return this.http.post(this.domain + '/search', condition, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }

  getAll() {
    return this.http.get(this.domain + '/food-item', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }

  getById(id: string) {
    return this.http.get(this.domain + '/food-item/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }

  remove(id: string) {
    return this.http.delete(this.domain + '/food-item/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    })
  }

  upload(data: any, files) {
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
      URL = `${this.domain}/food-item/${data._id}?token=Bearer ${localStorage.getItem('token')}`
      method = "PUT";
    } else {
      URL = `${this.domain}/food-item?token=Bearer ${localStorage.getItem('token')}`
      method = "POST";
    }
    xhr.open(method, URL, true);
    xhr.send(formData);

    return upload;
  }

}
