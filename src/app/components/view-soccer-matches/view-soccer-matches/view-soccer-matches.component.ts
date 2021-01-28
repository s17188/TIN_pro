import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowRef, NbWindowConfig } from '@nebular/theme';
import { Stat } from 'src/app/interfaces/stat';
import { Soccer } from 'src/app/interfaces/soccer';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-view-soccer-matches',
  templateUrl: './view-soccer-matches.component.html',
  styleUrls: ['./view-soccer-matches.component.scss']
})
export class ViewSoccerMatchesComponent implements OnInit {
  matches?:Stat[]

  constructor() { }

  ngOnInit(): void {}

}
