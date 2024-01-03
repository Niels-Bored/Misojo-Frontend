import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private showSpinner: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor() { }

  /**
  * Displays spinner
  */
  show() {
    this.showSpinner.next(true);
  }

  /**
  * Hides spinner
  */
  hide() {
    this.showSpinner.next(false);
  }

  /**
  * Return spinner state
  * @constructor
  * @returns {Observable<boolean>} Observable boolean to indicate if spinner is being showed
  */
  public getShowSpinnerObservable(): Observable<boolean> {
    return this.showSpinner
      .asObservable();
  }
}
