import {HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StoreState} from '@app-library/user/store';
import TStateUser = StoreState.TStateUser;

export interface IAuthPlugin {
  login(username: string, password: string);

  auth(req: HttpRequest<any>, authData: any): HttpRequest<any>;
}


export type TActions = 'token';
export type THTTPMethod = 'GET' | 'POST';
export type THTTPFormat = 'json';


export interface IActionConfig {
  method: THTTPMethod;
  header: string;
  path: string;
  format: THTTPFormat;
}

export type TRequestConfig = {
  [key in TActions]: IActionConfig
};

export const requestConfig: TRequestConfig = {
  token: {
    method: 'POST',
    header: 'Content-type: application/json',
    path: 'token',
    format: 'json'
  }
};

export interface ITokenRequest {
  grant_type: 'password';
  client_id: string;
  client_secret: string;
  scope: 'jsonapi';
  username: string;
  password: string;
}

export interface IAuthData<T> {
  username: string;
  data: T;
}

export interface IUserAuthService {
  login(login: string, pass: string);

  auth(req: HttpRequest<any>): Observable<HttpRequest<any>>;

  onLogin(): Observable<TStateUser>;

  onLogout(): Observable<TStateUser>;

  isLogged(): Observable<boolean>;

  toLocalStorage(data: any);

  fromLocalStorage(): any;

  restoreFromStorage();
}
