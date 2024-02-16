import { Injectable } from '@angular/core';
import { ISession } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  public refresh = ""
  public access = ""

  constructor() { }

  setSessionKeys(refresh:string, access:string){
    localStorage.setItem("refresh",refresh);
    localStorage.setItem("access",access);
  }

  getSessionKeys():ISession{
    this.refresh = localStorage.getItem("refresh")!;
    this.access =localStorage.getItem("access")!;
    return {
      refresh: this.refresh,
      access: this.access
    }
  }

  clearSessionKeys(){
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
  }
}
