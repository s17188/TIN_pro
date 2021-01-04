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

  async getAgentSoccers(){
    let token:any = await this.getToken()
    return this.http.post(this.api+'soccers/agent',token).toPromise()
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

  getMatches(){
    return this.http.get(this.api+'soccers/match').toPromise()
  }

  createMatch(match:any){
    return this.http.post(this.api+'soccers/match',match).toPromise()
  }

  addSoccerToMatch(soccerId:string,stats:any){
    let data = stats
    data.soccerId=soccerId
    return this.http.post(this.api+'soccers/stat',data).toPromise()
  }

  getToken(){
    return this.authService.getToken().toPromise()
  }

}
