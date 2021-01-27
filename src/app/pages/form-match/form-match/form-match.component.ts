import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbToastrService, NbWindowRef, NbWindowConfig, NbGlobalPhysicalPosition } from '@nebular/theme';
import { IApi } from 'src/app/interfaces/api';
import { Match } from 'src/app/interfaces/match';
import { Soccer } from 'src/app/interfaces/soccer';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import removeFalsy from 'src/app/util/removeFalsy';

@Component({
  selector: 'app-form-match',
  templateUrl: './form-match.component.html',
  styleUrls: ['./form-match.component.scss']
})
export class FormMatchComponent implements OnInit {
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
    private windowRef: NbWindowRef,
    private windowConf: NbWindowConfig,
    private fb: FormBuilder) 
    { 

    }

  ngOnInit(): void {
    this.windowConf.closeOnBackdropClick = false
    this.windowConf.closeOnEsc = false
    this.api.getMatches().then((res:IApi<Match[]>)=>{
      this.matches = res.data
    })
  }

  onSubmit(){
    let soccer:Soccer = <Soccer> this.windowConf.context
    let match:Match = removeFalsy(this.matchForm.value)
    this.api.addSoccerToMatch(soccer._id,match).then((res:any)=>{
      this.toast.showToast(NbGlobalPhysicalPosition.TOP_RIGHT,'success',res.message)
      this.windowRef.close()
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
    this.windowRef.close()
  }

}
