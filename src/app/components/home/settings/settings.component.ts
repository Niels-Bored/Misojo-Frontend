import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from "@angular/router";
import { finalize } from 'rxjs/operators';
import { MisojoApiService } from 'src/app/services/misojo-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';
import { TranslateMessagesService } from '../../../services/translate-messages.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.less'
})
export class SettingsComponent {

  public userInformation!:User
  public submitted = false;
  public showSpinner = false;
  public successTitle = "";
  public successMessage = "";
  public invalidMessage = "";
  public language = ""

  constructor(
    private router: Router,
    private misojoApi: MisojoApiService,
    private userService: UserService,
    private spinnerService: SpinnerService,
    private translateMessage: TranslateMessagesService,
    private sweetAlert: SweetAlertService,
    @Inject(PLATFORM_ID) private platformID: any
    ) { }

  ngOnInit(): void {
    this.spinnerService.getShowSpinnerObservable().subscribe(value=>{
      this.showSpinner=value;
    })

    this.translateMessage.setTitle("SETTINGS");

    let subscription = this.translateMessage.language$.subscribe((language) => {
      this.language = language;
      this.translateMessage.setTitle("SETTINGS");

    });

    this.setFormInformation()

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

  updateForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', Validators.required),
    },
    this.passwordMatchValidator
  );

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
  * Set user values on form
  */
  setFormInformation(){
    this.userInformation = this.userService.getUserInformation()
    this.updateForm.controls['name'].setValue(this.userInformation.first_name);
    this.updateForm.controls['lastName'].setValue(this.userInformation.last_name);
    this.updateForm.controls['email'].setValue(this.userInformation.email);
  }

  /**
  * Called when user submit the form
  */
  submit() {
    if(this.updateForm.invalid){
      this.invalidMessage = this.translateMessage.getMessage("ALERT_MESSAGES.CHECK_FIELDS")
      this.sweetAlert.alert("Error", this.invalidMessage, "error")
      this.submitted = true;
      return;
    }

    this.submitted = false;

    this.spinnerService.show();

    this.successTitle = this.translateMessage.getMessage("ALERT_MESSAGES.SUCCESS_TITLE")
    this.successMessage = this.translateMessage.getMessage("ALERT_MESSAGES.SUCCESS_LOGIN_TEXT")

    /* this.misojoApi.signUp({
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
      ); */


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
