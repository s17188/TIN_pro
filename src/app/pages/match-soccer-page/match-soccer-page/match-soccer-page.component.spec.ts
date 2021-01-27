import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchSoccerPageComponent } from './match-soccer-page.component';

describe('MatchSoccerPageComponent', () => {
  let component: MatchSoccerPageComponent;
  let fixture: ComponentFixture<MatchSoccerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchSoccerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchSoccerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
