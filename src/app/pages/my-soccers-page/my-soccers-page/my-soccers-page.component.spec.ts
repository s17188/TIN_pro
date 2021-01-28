import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbAuthModule } from '@nebular/auth';
import { NbThemeModule, NbToastrModule, NbWindowModule } from '@nebular/theme';

import { MySoccersPageComponent } from './my-soccers-page.component';

describe('MySoccersPageComponent', () => {
  let component: MySoccersPageComponent;
  let fixture: ComponentFixture<MySoccersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySoccersPageComponent ],
      imports: [
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
    fixture = TestBed.createComponent(MySoccersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
