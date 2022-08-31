import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupRequestPayload} from "../sign-up/signup-request.payload";
import {Observable} from "rxjs";
import {LocalStorageService} from "ngx-webstorage";
import {LoginRequestPayload} from "../login/login-request.payload";
import {LoginResponse} from "../login/login-response.payload";
import {map, tap} from "rxjs/operators";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {throwError} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUsername()
  }

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.http.post(this.baseUrl + 'api/auth/signup', signupRequestPayload, {responseType: 'text'});
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponse>(this.baseUrl + 'api/auth/login', loginRequestPayload)
      .pipe(map(data =>{
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        return true
      }));
  }

  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUsername()
    }

    return this.http.post<LoginResponse>(this.baseUrl + 'api/auth/refresh/token',
      refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getUsername() {
    return this.localStorage.retrieve('username');
  }

  getExpirationTime() {
    return this.localStorage.retrieve("expiresAt");
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

  logout() {
    this.http.post(this.baseUrl + 'api/auth/logout', this.refreshTokenPayload,
      {responseType: 'text'})
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }
}
