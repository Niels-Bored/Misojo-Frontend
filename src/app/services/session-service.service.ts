import { Injectable } from '@angular/core';
import { ISession } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  private refresh = ""
  private access = ""

  constructor() { }

  /**
  * Save session key values on localstorage
  */
  setSessionKeys(refresh:string, access:string){
    localStorage.setItem("refresh",refresh);
    localStorage.setItem("access",access);
  }

  /**
  * Get session key values from localstorage
  * @returns {ISession} Session keys format
  */
  getSessionKeys():ISession{
    this.refresh = localStorage.getItem("refresh")!;
    this.access =localStorage.getItem("access")!;
    return {
      refresh: this.refresh,
      access: this.access
    }
  }

  /**
  * Remove key session values from localstorage
  */
  clearSessionKeys(){
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
  }

  hasValidSession(){
    let value = false;
    if(localStorage.getItem("refresh")){
      value = true;
    }
    return value;
  }
}
