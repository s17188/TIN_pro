import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  data: any
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getSoccers().then((res:any)=>{
      this.data=res.data
    })
  }

}
