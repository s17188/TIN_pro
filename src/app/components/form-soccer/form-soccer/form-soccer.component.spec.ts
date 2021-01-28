import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NbAuthModule } from '@nebular/auth';
import { NbThemeModule, NbToastrModule, NbWindowModule, NbWindowRef } from '@nebular/theme';

import { FormSoccerComponent } from './form-soccer.component';

describe('FormSoccerComponent', () => {
  let component: FormSoccerComponent;
  let fixture: ComponentFixture<FormSoccerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSoccerComponent ],
      imports: [
        HttpClientTestingModule,
        NbAuthModule.forRoot(),
        NbToastrModule.forRoot(),
        NbThemeModule.forRoot(),
        NbWindowModule.forRoot(),
      ],
      providers:[
        { provide: NbWindowRef, useValue: close() },
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSoccerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
