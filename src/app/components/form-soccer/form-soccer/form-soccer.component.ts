import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { FormBuilder, Validators } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbWindowConfig, NbWindowRef } from '@nebular/theme';
import { IApi } from 'src/app/interfaces/api';
import { Soccer } from 'src/app/interfaces/soccer';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-form-soccer',
  templateUrl: './form-soccer.component.html',
  styleUrls: ['./form-soccer.component.scss']
})
export class FormSoccerComponent implements OnInit {
  currentSoccer?:Soccer
  edit:boolean = false
  soccerForm = this.fb.group({
    name: ['',Validators.required],
    surname: ['',Validators.required],
    height: [''],
    weight: [''],
    price: [''],
    birthdate: [''],
    gender: [''],
    nationality: [''],
    desc: ['']
  })
  options = [
    {value: 'Man', label: 'Man'},
    {value: 'Female', label: 'Female'}
  ];
  option: any

  constructor(
    private api:ApiService,
    private toast:ToastService,
    private ref: NbWindowRef,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.currentSoccer?.hasOwnProperty("name")){
      this.edit = true
      let data:any = this.currentSoccer
      this.soccerForm.setValue({
        name:data?.name || '',
        surname:data?.surname || '',
        height:data?.height || null,
        weight:data?.weight || null,
        price:data?.price || null,
        birthdate:data?.birthdate || '',
        gender:data?.gender || '',
        nationality:data?.nationality || '',
        desc:data?.desc || '',
      })
      if(data.gender){
        this.option = data.gender
      }
    }
  }

  onSubmit(){
    if(!this.edit){
      let data:Soccer = <Soccer> _.pickBy(this.soccerForm.value,_.identity)
      this.api.createSoccer(data).then(async (res:Observable<IApi<Soccer>>)=>{
        let newSoccer = await res.toPromise()
        this.toast.showToast(NbGlobalPhysicalPosition.TOP_RIGHT,'success',newSoccer.message)
        this.ref.close()
      })
    }else{
      let context:Soccer = <Soccer> this.currentSoccer
      let data:Soccer = <Soccer> _.pickBy(this.soccerForm.value,_.identity)
      data._id = context._id
      this.api.updateSoccer(data).then(async (res:Observable<IApi<Soccer>>)=>{
        let updatedSoccer = await res.toPromise()
        this.toast.showToast(NbGlobalPhysicalPosition.TOP_RIGHT,'success',updatedSoccer.message)
        this.ref.close()
      })
    }
  }

  close(){
    this.ref.close()
  }
}
