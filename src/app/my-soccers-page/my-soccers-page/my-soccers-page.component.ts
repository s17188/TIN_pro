import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { FormSoccerComponent } from 'src/app/form-soccer/form-soccer/form-soccer.component';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-my-soccers-page',
  templateUrl: './my-soccers-page.component.html',
  styleUrls: ['./my-soccers-page.component.scss']
})
export class MySoccersPageComponent implements OnInit {
  source: LocalDataSource;
  settings = {
    mode:'external',
    add:{
      confirmCreate:true
    },
    delete:{
      confirmDelete:true
    },
    edit:{
      confirmSave:true
    },
    columns: {
      name: {
        title: 'Name'
      },
      surname: {
        title: 'Surname'
      },
      height:{
        title: 'Height'
      },
      weight:{
        title: 'Weight'
      },
      age: {
        title: 'Age',
        editable: false
      },
      price:{
        title: 'Price'
      },
      birthdate: {
        title: 'Birthdate'
      },
      sex: {
        title: 'Sex'
      },
      nationality: {
        title: 'Nationality'
      },
      desc:{
        title: 'Description'
      }
    }
  };
  constructor(
    private api:ApiService,
    private windowService: NbWindowService,
    private toastrService: NbToastrService
  ) { 
    this.source = new LocalDataSource();
    this.getData()
  }

  ngOnInit(): void {
  }

  onCreate(){
    this.windowService.open(FormSoccerComponent, { title: `Add new Soccer` }).onClose.subscribe(()=>{
      this.getData()
    });
  }

  onDelete(event:any) {
    console.log(event)
    if (window.confirm('Are you sure you want to delete?')) {
      this.api.delSoccer(event.data).then((res:any)=>{
        console.log(res)
        this.showToast('top-right', res.status,res.message)
        this.getData()
      })
    } 
  }

  onEdit(event:any) {
    console.log(event)
    this.windowService.open(FormSoccerComponent, { title: `Edit Soccer`, context: event.data }).onClose.subscribe(()=>{
      this.getData()
    });
  }

  getData(){
    this.api.getAgentSoccers().then((data:any) => {
      this.source.load(data.data);
      this.source.setSort([{field:'create_date',direction:'desc'}])
    });
  }

  showToast(position:any, status:any,msg:string) {
    this.toastrService.show(
      '',
      msg,
      { position, status });
  }

}
