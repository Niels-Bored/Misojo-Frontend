import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private showSpinner: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor() { }

  show() {
    this.showSpinner.next(true);
  }

  hide() {
    this.showSpinner.next(false);
  }

  public getShowSpinnerObservable(): Observable<boolean> {
    return this.showSpinner
      .asObservable();
  }
}
