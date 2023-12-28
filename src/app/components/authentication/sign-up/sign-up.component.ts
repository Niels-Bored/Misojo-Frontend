import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from "@angular/router";
import { finalize } from 'rxjs/operators';
import { MisojoApiService } from 'src/app/services/misojo-api.service';
import Swal from 'sweetalert2'
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {

  public submitted = false;
  public showSpinner = false;

  constructor(
    private router: Router,
    private misojoApi: MisojoApiService,
    private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.getShowSpinnerObservable().subscribe(value=>{
      this.showSpinner=value;
    })
   }

  signUpForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', Validators.required),
    },
    this.passwordMatchValidator
  );

  private passwordMatchValidator(
    formGroup: AbstractControl
  ): ValidationErrors | null {
    const passwordConfirm = formGroup.get('passwordConfirm');

    if (formGroup.get('password')?.value === passwordConfirm?.value) {
      passwordConfirm?.setErrors(null);
      return null;
    }

    passwordConfirm?.setErrors({ mustMatch: true });
    return { invalid: true };
  }

  submit() {
    if(this.signUpForm.invalid){
      this.submitted = true;
      return;
    }

    this.submitted = false;

    this.spinnerService.show();

    this.misojoApi.signUp({
      first_name: this.signUpForm.get('name')!.value,
      last_name: this.signUpForm.get('lastName')!.value,
      email: this.signUpForm.get('email')!.value,
      password: this.signUpForm.get('password')!.value
    })
      .pipe(finalize(() => {
        this.spinnerService.hide();
      }))
      .subscribe(
        () => {
          Swal.fire({
            title: "Great",
            icon: "success",
            text: "Succesful login",
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
          this.redirectToLogin()
        },
        (errorDefinition:any) => this.handleError(errorDefinition)
      );


  }

  redirectToLogin(){
    this.router.navigate(["/login"]);
  }

  handleError(error: any) {
    //this.toastrService.showError(error.message)
    Swal.fire({
      title: "Error",
      icon: "error",
      text: error.message,
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
