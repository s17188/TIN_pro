import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NbAuthService, NbAuthSimpleToken, NbAuthToken } from '@nebular/auth';
import { IApi } from 'src/app/interfaces/api';
import { Soccer } from 'src/app/interfaces/soccer';
import { Match } from 'src/app/interfaces/match';
import { Stat } from 'src/app/interfaces/stat';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api = 'http://localhost:8080/api/'
  constructor(
    private http:HttpClient,
    private authService: NbAuthService
  ) { }

  getSoccers():Observable<IApi<Soccer[]>>{
    return this.http.get<IApi<Soccer[]>>(this.api+'soccers').pipe(
      catchError(this.handleError<IApi<Soccer[]>>())
    )
  }

  async getAgentSoccers():Promise<Observable<IApi<Soccer[]>>>{
    let token:NbAuthToken = await this.getToken()
    return this.http.post<IApi<Soccer[]>>(this.api+'soccers/agent',token).pipe(
      catchError(this.handleError<IApi<Soccer[]>>())
    )
  }

  async createSoccer(soccer:Soccer):Promise<Observable<IApi<Soccer>>>{
    let token:NbAuthToken = await this.getToken()
    soccer.agentId = token.getPayload()._id
    return this.http.post<IApi<Soccer>>(this.api+'soccers',soccer).pipe(
      catchError(this.handleError<IApi<Soccer>>())
    )
  }

  async updateSoccer(soccer:Soccer):Promise<Observable<IApi<Soccer>>>{
    let token:NbAuthToken = await this.getToken()
    soccer.agentId = token.getPayload()._id
    return this.http.put<IApi<Soccer>>(this.api+'soccers/'+soccer._id,soccer).pipe(
      catchError(this.handleError<IApi<Soccer>>())
    )
  }

  delSoccer(soccer:Soccer):Observable<IApi<Soccer>>{
    return this.http.delete<IApi<Soccer>>(this.api+'soccers/'+soccer._id).pipe(
      catchError(this.handleError<IApi<Soccer>>())
    )
  }

  getMatches():Observable<IApi<Match[]>>{
    return this.http.get<IApi<Match[]>>(this.api+'soccers/match').pipe(
      catchError(this.handleError<IApi<Match[]>>())
    )
  }

  createMatch(match:Match):Observable<IApi<Match>>{
    return this.http.post<IApi<Match>>(this.api+'soccers/match',match).pipe(
      catchError(this.handleError<IApi<Match>>())
    )
  }

  addSoccerToMatch(soccerId:string,match:Match):Observable<IApi<Match>>{
    match.soccerId=soccerId
    return this.http.post<IApi<Match>>(this.api+'soccers/stat',match).pipe(
      catchError(this.handleError<IApi<Match>>())
    )
  }

  getToken():Promise<NbAuthToken>{
    return this.authService.getToken().toPromise()
  }

  private handleError<T>(result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      return of(result);
    };
  }

}
