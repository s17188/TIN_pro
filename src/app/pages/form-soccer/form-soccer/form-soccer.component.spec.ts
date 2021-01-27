import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSoccerComponent } from './form-soccer.component';

describe('FormSoccerComponent', () => {
  let component: FormSoccerComponent;
  let fixture: ComponentFixture<FormSoccerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSoccerComponent ]
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
