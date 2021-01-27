import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbAuthService, NbAuthSimpleToken, NbAuthToken } from '@nebular/auth';
import { IApi } from 'src/app/interfaces/api';
import { Soccer } from 'src/app/interfaces/soccer';
import { Match } from 'src/app/interfaces/match';
import { Stat } from 'src/app/interfaces/stat';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api = 'http://localhost:8080/api/'
  constructor(
    private http:HttpClient,
    private authService: NbAuthService
  ) { }

  getSoccers():Promise<IApi<Soccer[]>>{
    return this.http.get<IApi<Soccer[]>>(this.api+'soccers').toPromise()
  }

  async getAgentSoccers():Promise<IApi<Soccer[]>>{
    let token:NbAuthToken = await this.getToken()
    return this.http.post<IApi<Soccer[]>>(this.api+'soccers/agent',token).toPromise()
  }

  async createSoccer(soccer:Soccer):Promise<IApi<Soccer>>{
    let token:NbAuthToken = await this.getToken()
    soccer.agentId = token.getPayload()._id
    return this.http.post<IApi<Soccer>>(this.api+'soccers',soccer).toPromise()
  }

  async updateSoccer(soccer:Soccer):Promise<IApi<Soccer>>{
    let token:NbAuthToken = await this.getToken()
    soccer.agentId = token.getPayload()._id
    return this.http.put<IApi<Soccer>>(this.api+'soccers/'+soccer._id,soccer).toPromise()
  }

  delSoccer(soccer:Soccer):Promise<IApi<Soccer>>{
    return this.http.delete<IApi<Soccer>>(this.api+'soccers/'+soccer._id).toPromise()
  }

  getMatches():Promise<IApi<Match[]>>{
    return this.http.get<IApi<Match[]>>(this.api+'soccers/match').toPromise()
  }

  createMatch(match:Match):Promise<IApi<Match>>{
    return this.http.post<IApi<Match>>(this.api+'soccers/match',match).toPromise()
  }

  addSoccerToMatch(soccerId:string,match:Match):Promise<IApi<Match>>{
    match.soccerId=soccerId
    return this.http.post<IApi<Match>>(this.api+'soccers/stat',match).toPromise()
  }

  getToken():Promise<NbAuthToken>{
    return this.authService.getToken().toPromise()
  }

}
