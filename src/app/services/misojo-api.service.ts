import { Injectable } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from 'src/environments/environment';
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ISignUpRequest } from '../models/sign-up-request.model';
import { ILoginRequest } from '../models/login-request';
import { IAuthenticationResponse } from '../models/authentication-response';
import { SessionServiceService } from './session-service.service';

@Injectable({
  providedIn: 'root'
})
export class MisojoApiService {

  endpoint:string = environment.server

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionServiceService,
    @Inject(PLATFORM_ID) private platformID: any
  ) { }

  /**
  * Calls server to create a new user.
  * @constructor
  * @param {ISignUpRequest} request - Request values on user endpoint
  * @returns {Observable<IAuthenticationResponse>} Observable IAuthenticationResponse model
  */
  signUp(request: ISignUpRequest): Observable<IAuthenticationResponse>{
    return this.httpClient
      .post<IAuthenticationResponse>(
        `${this.endpoint}/users/`,
        request
      )
      .pipe(
        tap((response) => console.log(response)),
        catchError((error) => this.handleError(error))
      );
  }

  /**
  * Calls server to validate user session.
  * @constructor
  * @param {ILoginRequest} request - Request values on token endpoint
  * @returns {Observable<IAuthenticationResponse>} Observable IAuthenticationResponse model
  */
  login(request: ILoginRequest): Observable<IAuthenticationResponse>{
    return this.httpClient
      .post<IAuthenticationResponse>(
        `${this.endpoint}/token/`,
        request
      )
      .pipe(
        tap((response) => {
          //Disable use of localstorage if page is not load on browser
          if(isPlatformBrowser(this.platformID)){
            this.sessionService.setSessionKeys(response.data.refresh, response.data.access)
          }
        }),
        catchError((error) => this.handleError(error))
      );
  }

  /**
  * Throws an error on called endpoint.
  * @constructor
  * @param {HttpErrorResponse} response - Request values on token endpoint
  * @returns {Observable<never>} Observable error
  */
  handleError(response: HttpErrorResponse) {
    if (response.status === 0 || response.status === 401) {
      console.log(response.error)
    }

    return throwError(response.error);
  }



}
