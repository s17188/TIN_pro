import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySoccersPageComponent } from './my-soccers-page.component';

describe('MySoccersPageComponent', () => {
  let component: MySoccersPageComponent;
  let fixture: ComponentFixture<MySoccersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySoccersPageComponent ]
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
