import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  constructor() { }

  setSessionKeys(refresh:string, access:string){
    localStorage.setItem("refresh",refresh);
    localStorage.setItem("access",access);
  }

  clearSessionKeys(refresh:string, access:string){
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
  }
}
