import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbAuthModule } from '@nebular/auth';

import { MatchesPageComponent } from './matches-page.component';

describe('MatchesPageComponent', () => {
  let component: MatchesPageComponent;
  let fixture: ComponentFixture<MatchesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesPageComponent ],
      imports: [
        HttpClientTestingModule,
        NbAuthModule.forRoot()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
