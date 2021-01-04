import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSoccerMatchesComponent } from './view-soccer-matches.component';

describe('ViewSoccerMatchesComponent', () => {
  let component: ViewSoccerMatchesComponent;
  let fixture: ComponentFixture<ViewSoccerMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSoccerMatchesComponent ]
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
