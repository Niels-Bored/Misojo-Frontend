import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from "@angular/router";
import { finalize } from 'rxjs/operators';
import { MisojoApiService } from 'src/app/services/misojo-api.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import {TranslateService} from '@ngx-translate/core';
import { SweetAlertService } from '../../../services/sweet-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  public submitted = false;
  public showSpinner = false;
  public successTitle = ""
  public successMessage = ""
  public invalidMessage = ""

  constructor(
    private router: Router,
    private misojoApi: MisojoApiService,
    private spinnerService: SpinnerService,
    private translateService: TranslateService,
    private sweetAlert: SweetAlertService) { }

  ngOnInit(): void {
    this.spinnerService.getShowSpinnerObservable().subscribe(value=>{
      this.showSpinner=value;
    })
  }

  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    }
  );

  /**
  * Called when user submit the form
  */
  submit() {
    if(this.loginForm.invalid){
      this.translateService.get('ALERT_MESSAGES.CHECK_FIELDS').subscribe((res: string) => {
        this.invalidMessage = res
      });

      this.sweetAlert.alert("Error", this.invalidMessage, "error")
      this.submitted = true;
      return;
    }

    this.submitted = false;

    this.spinnerService.show();



    this.translateService.get('ALERT_MESSAGES.SUCCESS_TITLE').subscribe((res: string) => {
      this.successTitle = res
    });

    this.translateService.get('ALERT_MESSAGES.SUCCESS_LOGIN_TEXT').subscribe((res: string) => {
      this.successMessage = res
    });

    this.misojoApi.login(this.loginForm.value)
      .pipe(finalize(() => {
        this.spinnerService.hide();
      }))
      .subscribe(
        () => {
          this.sweetAlert.alert(this.successTitle, this.successMessage, "success")
          this.redirectToHome()
        },
        (errorDefinition:any) => this.handleError(errorDefinition)
      );
  }

  /**
  * Redirects to home
  */
  redirectToHome(){
    this.router.navigate(["/home"]);
  }

  /**
  * Responds to any error on login function.
  * @constructor
  * @param {any} error - The error returned from the server
  */
  handleError(error: any) {
    this.sweetAlert.alert("Error", error.message, "error")
  }
}
