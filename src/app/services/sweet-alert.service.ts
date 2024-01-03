import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  alert(title:string, text: string, icon:string){
    Swal.fire({
      title: title,
      icon: "error",
      text: text,
      html: "<p class='sweet-alert-text' tabindex=1 aria-label='"+text+"'>"+text+"</p",
      color: "#020202",
      background: "#fffbf5",
      confirmButtonColor: "#ffac6c",
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
