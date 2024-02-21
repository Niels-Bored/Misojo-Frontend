import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private id:number = 0
  private first_name:string = ""
  private last_name:string = ""
  private email:string = ""

  constructor() { }

  /**
  * Save user information on localstorage
  */
  setUserInformation(id:number, first_name:string, last_name:string, email:string){
    localStorage.setItem("user-id",id.toString());
    localStorage.setItem("user-first-name",first_name);
    localStorage.setItem("user-last-name", last_name)
    localStorage.setItem("user-email", email)
  }

  /**
  * Get user information from localstorage
  * @returns {User} User information format
  */
  getUserInformation():User{
    this.id = Number(localStorage.getItem("user-id"))
    this.first_name = localStorage.getItem("user-first-name")!
    this.last_name = localStorage.getItem("user-last-name")!
    this.email = localStorage.getItem("user-email")!
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email
    }
  }

  /**
  * Remove user information values from localstorage
  */
  clearUserInformation(){
    localStorage.removeItem("user-id");
    localStorage.removeItem("user-first-name");
    localStorage.removeItem("user-last-name")
    localStorage.removeItem("user-email")
  }
}
