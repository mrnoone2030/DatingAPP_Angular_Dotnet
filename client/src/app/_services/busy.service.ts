import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  private busyRequestCount = 0;

  constructor(private spinner: NgxSpinnerService) { }

  busy(){
    this.busyRequestCount++;
    this.spinner.show(undefined, {
      type: 'square-jelly-box',
      size: 'medium',
      bdColor: 'rgba(255,255,255,0)',
      color: '#333333'
    });
  }

  idle(){
  this.busyRequestCount--;
  if(this.busyRequestCount <=0){
    this.busyRequestCount =0;
    this.spinner.hide();
  }

  }
}
