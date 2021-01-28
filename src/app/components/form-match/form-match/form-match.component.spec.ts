import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InjectionToken, FactoryProvider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NbAuthModule } from '@nebular/auth';
import { NbThemeModule, NbToastrModule, NbWindowModule, NbWindowRef } from '@nebular/theme';

import { FormMatchComponent } from './form-match.component';

describe('FormMatchComponent', () => {
  let component: FormMatchComponent;
  let fixture: ComponentFixture<FormMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMatchComponent ],
      imports: [
        HttpClientTestingModule,
        NbAuthModule.forRoot(),
        NbToastrModule.forRoot(),
        NbWindowModule,
        NbThemeModule.forRoot()
      ],
      providers:[
        { provide: NbWindowRef, useValue: close() },
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
