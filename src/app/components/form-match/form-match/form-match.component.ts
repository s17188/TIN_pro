import { Component, Inject, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { FormBuilder, Validators } from '@angular/forms';
import { NbWindowRef, NbWindowConfig, NbGlobalPhysicalPosition } from '@nebular/theme';
import { IApi } from 'src/app/interfaces/api';
import { Match } from 'src/app/interfaces/match';
import { Soccer } from 'src/app/interfaces/soccer';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-form-match',
  templateUrl: './form-match.component.html',
  styleUrls: ['./form-match.component.scss']
})
export class FormMatchComponent implements OnInit {
  currentSoccer?:Soccer
  matches:Match[] = []
  selectedMatch?:Match = undefined
  matchForm = this.fb.group({
    matchId: ['',Validators.required],
    playtime: [''],
    redCards: [''],
    yellowCards: ['']
  })
  addMatchForm = this.fb.group({
    match_date: [{
      value:'',
      disabled:this.selectedMatch != undefined
    },
    Validators.required],
    stadium: ['',Validators.required],
  })
  options = [
    {value: 'Man', label: 'Man'},
    {value: 'Female', label: 'Female'}
  ];
  constructor(
    private api:ApiService,
    private toast:ToastService,
    private ref: NbWindowRef,
    private fb: FormBuilder) 
    { 

    }

  ngOnInit(): void {
    this.api.getMatches().then((res:IApi<Match[]>)=>{
      this.matches = res.data
    })
  }

  onSubmit(){
    let soccer:Soccer = <Soccer> this.currentSoccer
    let match:Match = <Match> _.pickBy(this.matchForm.value,_.identity)
    this.api.addSoccerToMatch(soccer._id,match).then((res:any)=>{
      this.toast.showToast(NbGlobalPhysicalPosition.TOP_RIGHT,'success',res.message)
      this.close()
    })
  }

  addNewMatch(){
    this.api.createMatch(this.addMatchForm.value).then((res:IApi<Match>)=>{
      this.toast.showToast(NbGlobalPhysicalPosition.TOP_RIGHT,'success',res.message)
      this.api.getMatches().then((res:IApi<Match[]>)=>{
        this.matches = res.data
        this.addMatchForm.setValue({
          match_date:'',
          stadium:''
        })
      })
    })
  }

  close(){
    this.ref.close()
  }
}
