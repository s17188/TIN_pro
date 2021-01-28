import { Component, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition, NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { FormMatchComponent } from 'src/app/components/form-match/form-match/form-match.component';
import { FormSoccerComponent } from 'src/app/components/form-soccer/form-soccer/form-soccer.component';
import { ViewSoccerMatchesComponent } from 'src/app/components/view-soccer-matches/view-soccer-matches/view-soccer-matches.component';
import { IApi } from 'src/app/interfaces/api';
import { Soccer } from 'src/app/interfaces/soccer';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';
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
    actions:{
      custom:[
        {
          name:'add-match',
          title:'Add match'
        },
        {
          name:'view-match',
          title:'View matches'
        }
      ]
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
      gender: {
        title: 'Gender'
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
    private toast:ToastService
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
    let soccer:Soccer = event.data
    if (window.confirm('Are you sure you want to delete?')) {
      this.api.delSoccer(soccer).then((res:IApi<Soccer>)=>{
        this.toast.showToast(NbGlobalPhysicalPosition.TOP_RIGHT, res.status,res.message)
        this.getData()
      })
    } 
  }

  onEdit(event:any) {
    let soccer:Soccer = event.data
    this.windowService.open(FormSoccerComponent, { title: `Edit Soccer`, context: {currentSoccer:soccer} }).onClose.subscribe(()=>{
      this.getData()
    });
  }

  onCustom(event:any) {
    let soccer:Soccer = event.data
    if(event.action == "add-match"){
      this.windowService.open(FormMatchComponent, { title: `Add Match`, context: {currentSoccer:soccer}}).onClose.subscribe(()=>{
        this.getData()
      });
    }else{
      this.windowService.open(ViewSoccerMatchesComponent, { title: `Matches & Stats`, context: {matches:soccer.stats} })
    }
  }

  getData(){
    this.api.getAgentSoccers().then((data:IApi<Soccer[]>) => {
      this.source.load(data.data);
      this.source.setSort([{field:'create_date',direction:'desc'}])
    });
  }
}
