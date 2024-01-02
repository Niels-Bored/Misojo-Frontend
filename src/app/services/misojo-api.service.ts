import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable, of } from "rxjs";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ISignUpRequest } from '../models/sign-up-request.model';
import { ILoginRequest } from '../models/login-request';
import { IAuthenticationResponse } from '../models/authentication-response';

@Injectable({
  providedIn: 'root'
})
export class MisojoApiService {

  private endpoint: string = environment.server + 'api';

  constructor(
    private httpClient: HttpClient
  ) { }

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

  login(request: ILoginRequest): Observable<IAuthenticationResponse>{
    return this.httpClient
      .post<IAuthenticationResponse>(
        `${this.endpoint}/token/`,
        request
      )
      .pipe(
        tap((response) => {
          localStorage.setItem("refresh",response.data.refresh);
          localStorage.setItem("access",response.data.access);
        }),
        catchError((error) => this.handleError(error))
      );
  }

  refreshToken(token: string): Observable<IAuthenticationResponse>{
    return this.httpClient
      .post<IAuthenticationResponse>(
        `${this.endpoint}/token/`,
        token
      )
      .pipe(
        tap((response) => {
          localStorage.setItem("refresh",response.data.refresh);
          localStorage.setItem("access",response.data.access);
        }),
        catchError((error) => this.handleError(error))
      );
  }

  handleError(response: HttpErrorResponse) {
    if (response.status === 0 || response.status === 401) {
      console.log(response.error)
    }

    return throwError(response.error);
  }



}
