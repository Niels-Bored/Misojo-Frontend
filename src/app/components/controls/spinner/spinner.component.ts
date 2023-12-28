import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.less']
})
export class SpinnerComponent implements OnInit {

  public showSpinner : Observable<boolean>;

  constructor(
      private spinnerService : SpinnerService) {
      this.showSpinner = this.spinnerService
        .getShowSpinnerObservable();
  }
  
  ngOnInit(): void {
  }

}
