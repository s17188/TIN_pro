import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NbToastrService, NbWindowConfig, NbWindowRef } from '@nebular/theme';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-form-soccer',
  templateUrl: './form-soccer.component.html',
  styleUrls: ['./form-soccer.component.scss']
})
export class FormSoccerComponent implements OnInit {
  edit:boolean = false
  soccerForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    height: new FormControl(''),
    weight: new FormControl(''),
    // age: new FormControl(''),
    price: new FormControl(''),
    birthdate: new FormControl(''),
    sex: new FormControl(''),
    nationality: new FormControl(''),
    desc: new FormControl(''),
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
    private windowConf: NbWindowConfig) { }

  ngOnInit(): void {
    this.windowConf.closeOnBackdropClick = false
    this.windowConf.closeOnEsc = false
    console.log(this.windowConf.context)
    if(this.windowConf.context?.hasOwnProperty("name")){
      this.edit = true
      let data:any = this.windowConf.context
      this.soccerForm.setValue({
        name:data?.name || '',
        surname:data?.surname || '',
        height:data?.height || null,
        weight:data?.weight || null,
        // age:data?.age || null,
        price:data?.price || null,
        birthdate:data?.birthdate || '',
        sex:data?.sex || '',
        nationality:data?.nationality || '',
        desc:data?.desc || '',
      })
      if(data.sex){
        this.option = data.sex
      }
    }
  }

  onSubmit(){
    if(!this.edit){
      let data = this.removeFalsy(this.soccerForm.value)
      this.api.createSoccer(data).then((res:any)=>{
        console.log(res)
        this.showToast('top-right', 'success',res.message)
        this.windowRef.close()
      })
    }else{
      let context:any = this.windowConf.context
      let data = this.soccerForm.value
      data._id = context._id
      this.api.updateSoccer(data).then((res:any)=>{
        console.log(res)
        this.showToast('top-right', 'success',res.message)
        this.windowRef.close()
      })
    }
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
