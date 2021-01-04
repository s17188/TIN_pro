import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NbToastrService, NbWindowRef, NbWindowConfig } from '@nebular/theme';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-form-match',
  templateUrl: './form-match.component.html',
  styleUrls: ['./form-match.component.scss']
})
export class FormMatchComponent implements OnInit {
  matches:any = []
  selectedMatch:any
  matchForm = new FormGroup({
    matchId: new FormControl(''),
    playtime: new FormControl(''),
    redCards: new FormControl(''),
    yellowCards: new FormControl('')
  });
  addMatchForm = new FormGroup({
    match_date: new FormControl(''),
    stadium: new FormControl('')
  });
  options = [
    {value: 'Man', label: 'Man'},
    {value: 'Female', label: 'Female'}
  ];
  option: any
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
    this.api.getMatches().then((res:any)=>{
      this.matches = res.data
    })
  }

  onSubmit(){
    console.log(this.selectedMatch)
    let soccer:any = this.windowConf.context
    let match = this.removeFalsy(this.matchForm.value)
    this.api.addSoccerToMatch(soccer._id,match).then((res:any)=>{
      console.log(res)
      this.showToast('top-right', 'success',res.message)
      this.windowRef.close()
    })
  }

  addNewMatch(){
    console.log(this.addMatchForm)
    this.api.createMatch(this.addMatchForm.value).then((res:any)=>{
      console.log(res)
      this.showToast('top-right', 'success',res.message)
      this.api.getMatches().then((res:any)=>{
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

  showToast(position:any, status:any,msg:string) {
    this.toastrService.show(
      '',
      msg,
      { position, status });
  }

  removeFalsy(obj:any){
    let newObj:any = {};
    Object.keys(obj).forEach((prop) => {
      if (obj[prop]) { newObj[prop] = obj[prop]; }
    });
    return newObj;
  };
}
