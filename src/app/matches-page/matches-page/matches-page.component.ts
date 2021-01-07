import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-matches-page',
  templateUrl: './matches-page.component.html',
  styleUrls: ['./matches-page.component.scss']
})
export class MatchesPageComponent implements OnInit {
  data:any
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getMatches().then((res:any)=>{
      console.log(res)
      this.data=res.data.sort((a:any,b:any) => (a.create_date > b.create_date) ? -1 : ((b.create_date > a.create_date) ? 1 : 0));
    })
  }

}
