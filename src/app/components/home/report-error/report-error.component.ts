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
  selector: 'app-report-error',
  templateUrl: './report-error.component.html',
  styleUrl: './report-error.component.less'
})
export class ReportErrorComponent {
  public submitted = false;
  public showSpinner = false;
  public successTitle = "";
  public successMessage = "";
  public invalidMessage = "";
  public language = ""
  public sections: string[] = ['TITLE.SIGNUP', 'TITLE.LOGIN', 'TITLE.ERRORREPORT', 'TITLE.ABOUT', 'TITLE.SETTINGS'];
  optionSelected: string = '';

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

    this.translateMessage.setTitle("ERRORREPORT");

    this.translateMessage.language$.subscribe((language) => {
      this.language = language;
      this.translateMessage.setTitle("ERRORREPORT");
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

  errorForm: FormGroup = new FormGroup(
    {
      error: new FormControl('', Validators.required)
    }
  );

  /**
  * Detects a change on select component
  * @constructor
  * @param {any} option - Option value selected from component
  */
  onOptionSelectedChange(option: any): void {
    this.optionSelected = option;
  }

  /**
  * Called when user submit the form
  */
  submit() {
    if(this.errorForm.invalid){
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
