import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }
  /**
  * Displays pre configured sweet alert.
  * @constructor
  * @param {string} title - Displayable title on sweetalert
  * @param {string} text - Displayable text on sweetalert
  * @param {string} icon - String to indicate sweetalert state
  */
  alert(title:string, text: string, icon:SweetAlertIcon){
    Swal.fire({
      title: title,
      icon: icon,
      text: text,
      html: "<p class='sweet-alert-text' tabindex=1 aria-label='"+text+"'>"+text+"</p",
      color: "#020202",
      background: "#e2e8ce",
      confirmButtonColor: "#aebea4",
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: "Ok",
      confirmButtonAriaLabel: "Ok",
      cancelButtonText: "Cancel",
      cancelButtonAriaLabel: "Cancel",
      iconColor: "#ffac6cc2"
    });
  }
}
