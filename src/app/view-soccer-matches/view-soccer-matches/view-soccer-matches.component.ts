import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowRef, NbWindowConfig } from '@nebular/theme';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-view-soccer-matches',
  templateUrl: './view-soccer-matches.component.html',
  styleUrls: ['./view-soccer-matches.component.scss']
})
export class ViewSoccerMatchesComponent implements OnInit {
  matches:any
  constructor(
    private api:ApiService,
    private toastrService: NbToastrService,
    private windowRef: NbWindowRef,
    private windowConf: NbWindowConfig) 
    { 

    }

  ngOnInit(): void {
    this.windowConf.closeOnBackdropClick = false
    this.windowConf.closeOnEsc = false
    console.log(this.windowConf.context)
    let context:any = this.windowConf.context
    this.matches = context.stats
  }

}
