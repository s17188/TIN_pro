import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api = 'http://localhost:8080/api/'
  constructor(private http:HttpClient) { }

  getSoccers(){
    return this.http.get(this.api+'soccers').toPromise()
  }
}
