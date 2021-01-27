import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbWindowConfig, NbWindowRef } from '@nebular/theme';
import { IApi } from 'src/app/interfaces/api';
import { Soccer } from 'src/app/interfaces/soccer';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import removeFalsy from 'src/app/util/removeFalsy';
@Component({
  selector: 'app-form-soccer',
  templateUrl: './form-soccer.component.html',
  styleUrls: ['./form-soccer.component.scss']
})
export class FormSoccerComponent implements OnInit {
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
    private windowRef: NbWindowRef,
    private windowConf: NbWindowConfig,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.windowConf.closeOnBackdropClick = false
    this.windowConf.closeOnEsc = false
    if(this.windowConf.context?.hasOwnProperty("name")){
      this.edit = true
      let data:any = this.windowConf.context
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
      let data:Soccer = removeFalsy(this.soccerForm.value)
      this.api.createSoccer(data).then((res:IApi<Soccer>)=>{
        this.toast.showToast(NbGlobalPhysicalPosition.TOP_RIGHT,'success',res.message)
        this.windowRef.close()
      })
    }else{
      let context:Soccer = <Soccer> this.windowConf.context
      let data:Soccer = this.soccerForm.value
      data._id = context._id
      this.api.updateSoccer(data).then((res:IApi<Soccer>)=>{
        this.toast.showToast(NbGlobalPhysicalPosition.TOP_RIGHT,'success',res.message)
        this.windowRef.close()
      })
    }
  }

  close(){
    this.windowRef.close()
  }
}
