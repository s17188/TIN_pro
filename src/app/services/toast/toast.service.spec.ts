import { TestBed } from '@angular/core/testing';
import { NbThemeModule, NbToastrModule } from '@nebular/theme';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        NbToastrModule.forRoot(),
        NbThemeModule.forRoot()
      ],
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
