import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { IApi } from 'src/app/interfaces/api';
import { Soccer } from 'src/app/interfaces/soccer';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  data?: Soccer[]
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getSoccers().then((res:IApi<Soccer[]>)=>{
      this.data = _.orderBy(res.data,'create_date','desc')
    })
  }

}
