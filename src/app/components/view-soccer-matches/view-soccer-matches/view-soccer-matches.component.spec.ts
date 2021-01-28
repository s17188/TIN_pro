import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbThemeModule, NbToastrModule, NbWindowModule } from '@nebular/theme';

import { ViewSoccerMatchesComponent } from './view-soccer-matches.component';

describe('ViewSoccerMatchesComponent', () => {
  let component: ViewSoccerMatchesComponent;
  let fixture: ComponentFixture<ViewSoccerMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSoccerMatchesComponent ],
      imports:[
        HttpClientTestingModule,
        NbAuthModule.forRoot(),
        NbWindowModule.forRoot(),
        NbThemeModule.forRoot(),
        NbToastrModule.forRoot()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSoccerMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
