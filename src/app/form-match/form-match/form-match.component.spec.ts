import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMatchComponent } from './form-match.component';

describe('FormMatchComponent', () => {
  let component: FormMatchComponent;
  let fixture: ComponentFixture<FormMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMatchComponent ]
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
