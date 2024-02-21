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
import { TranslateService } from '@ngx-translate/core';
import { SessionServiceService } from './session-service.service';
import { UserService } from './user.service';
import { IUserResponse } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MisojoApiService {

  endpoint:string = environment.server

  protected readonly jsonHeaderValue: string = "application/json";
  private readonly contentTypeKey: string = "content-type";
  private readonly localeKey: string = "locale";
  private readonly acceptHeaderKey: string = "accept";
  private readonly authorizationHeaderKey: string = "Authorization";
  private readonly bearerKey: string = "Bearer";
  private readonly requestorKey: string = "requestor";
  private tokenRecaptcha: string = "";

  constructor(
    private httpClient: HttpClient,
    private translateService: TranslateService,
    private sessionService: SessionServiceService,
    private userService: UserService,
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
  * Get logged user information.
  * @returns {Observable<never>} Observable error
  */
  getUserInformation(): Observable<IUserResponse>{
    return this.httpClient
      .get<IUserResponse>(
        `${this.endpoint}/users/`,{
          headers: this.getHeaders(),
        }
      )
      .pipe(
        tap((response) => {
          //Disable use of localstorage if page is not load on browser
          if(isPlatformBrowser(this.platformID)){
            this.userService.setUserInformation(response.data[0].id, response.data[0].first_name, response.data[0].last_name, response.data[0].email)
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

  /**
  * Return header values
  * @returns {HttpHeaders} HttpHeaders format for httpClient
  */
  getHeaders(): HttpHeaders {
    let token = this.sessionService.getSessionKeys()
    const headers = new HttpHeaders()
          .set(this.contentTypeKey, this.jsonHeaderValue)
          .append(this.acceptHeaderKey, this.jsonHeaderValue)
          .append(
            this.authorizationHeaderKey,
            `${this.bearerKey} ${token.access}`
          )

    return headers;
  }

}
