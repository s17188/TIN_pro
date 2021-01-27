import { Injectable } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastService:NbToastrService) { }

  showToast(position:NbGlobalPhysicalPosition, status:any,msg:string) {
    this.toastService.show(
      '',
      msg,
      { position, status });
  }
}
