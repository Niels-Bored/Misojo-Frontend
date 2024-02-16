import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from "@angular/router";
import { finalize } from 'rxjs/operators';
import { MisojoApiService } from 'src/app/services/misojo-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { TranslateMessagesService } from '../../../services/translate-messages.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less']
})
export class SignUpComponent implements OnInit {

  public submitted = false;
  public showSpinner = false;
  public successTitle = "";
  public successMessage = "";
  public invalidMessage = "";
  public language = ""

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

  constructor(
    private router: Router,
    private misojoApi: MisojoApiService,
    private spinnerService: SpinnerService,
    private translateMessage: TranslateMessagesService,
    private sweetAlert: SweetAlertService,
    @Inject(PLATFORM_ID) private platformID: any
    ) { }

  ngOnInit(): void {
    this.spinnerService.getShowSpinnerObservable().subscribe(value=>{
      this.showSpinner=value;
    })

    this.translateMessage.setTitle("SIGNUP");

    let subscription = this.translateMessage.language$.subscribe((language) => {
      this.language = language;
      this.translateMessage.setTitle("SIGNUP");

    });
    //Disable use of document if page is not load on browser
    if(isPlatformBrowser(this.platformID)){
      // Disable aos wait if screen is small
      if (window.innerHeight < 600) {
        document.querySelectorAll('[data-aos]')?.forEach((elem) =>
          elem.setAttribute('data-aos-delay', '0')
        )
      }
    }
  }

  /**
  * Generates an error in case that both passwords weren't the same
  */
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

  /**
  * Called when user submit the form
  */
  submit() {
    if(this.signUpForm.invalid){
      this.invalidMessage = this.translateMessage.getMessage("ALERT_MESSAGES.CHECK_FIELDS")
      this.sweetAlert.alert("Error", this.invalidMessage, "error")
      this.submitted = true;
      return;
    }

    this.submitted = false;

    this.spinnerService.show();

    this.successTitle = this.translateMessage.getMessage("ALERT_MESSAGES.SUCCESS_TITLE")
    this.successMessage = this.translateMessage.getMessage("ALERT_MESSAGES.SUCCESS_LOGIN_TEXT")

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
          this.sweetAlert.alert(this.successTitle, this.successMessage, "success")
          this.redirectToLogin()
        },
        (errorDefinition:any) => this.handleError(errorDefinition)
      );


  }

  /**
  * Redirects to login
  */
  redirectToLogin(){
    this.router.navigate(["/login"]);
  }


  /**
  * Respond to any error on signup function.
  * @constructor
  * @param {any} error - The error returned from the server
  */
  handleError(error: any) {
    let errorMessage = this.translateMessage.getMessage(error.message)
    this.sweetAlert.alert("Error", errorMessage, "error")
  }
}
