import { Component, OnInit } from '@angular/core';
import { IApi } from 'src/app/interfaces/api';
import { Match } from 'src/app/interfaces/match';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-matches-page',
  templateUrl: './matches-page.component.html',
  styleUrls: ['./matches-page.component.scss']
})
export class MatchesPageComponent implements OnInit {
  data?:Match[]
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getMatches().then((res:IApi<Match[]>)=>{
      this.data=res.data.sort((a:Match,b:Match) => (a.create_date > b.create_date) ? -1 : ((b.create_date > a.create_date) ? 1 : 0));
    })
  }

}
