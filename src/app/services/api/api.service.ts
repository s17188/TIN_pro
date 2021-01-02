import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbAuthService } from '@nebular/auth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api = 'http://localhost:8080/api/'
  constructor(
    private http:HttpClient,
    private authService: NbAuthService
  ) { }

  getSoccers(){
    return this.http.get(this.api+'soccers').toPromise()
  }

  async createSoccer(soccer:any){
    let token:any = await this.getToken()
    soccer.agentId = token.payload._id
    return this.http.post(this.api+'soccers',soccer).toPromise()
  }

  async updateSoccer(soccer:any){
    let token:any = await this.getToken()
    soccer.agentId = token.payload._id
    return this.http.put(this.api+'soccers/'+soccer._id,soccer).toPromise()
  }

  delSoccer(soccer:any){
    return this.http.delete(this.api+'soccers/'+soccer._id).toPromise()
  }

  getToken(){
    return this.authService.getToken().toPromise()
  }

}
