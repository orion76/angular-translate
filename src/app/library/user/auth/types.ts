import { HttpParams, HttpHeaders } from '@angular/common/http';


export interface IAuthPlugin {
  login(username: string, password: string);
}


export type TActions = 'token';
export type THTTPMethod = 'GET' | 'POST';
export type THTTPFormat = 'json';

export interface IHTTPOptotions {
  body?: any;
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  withCredentials?: boolean;
}


export interface IActionConfig {
  method: THTTPMethod,
  header: string,
  path: string,
  format: THTTPFormat
}

export type TRequestConfig = {
  [key in TActions]: IActionConfig
}

export const RequestConfig: TRequestConfig = {
  token: {
    method: 'POST',
    header: 'Content-type: application/json',
    path: 'token',
    format: 'json'
  }
}

export interface ITokenRequest {
  grant_type: 'password',
  client_id: string,
  client_secret: string,
  scope: 'jsonapi',
  username: string,
  password: string
}

export interface IUserAuthService {
  login(login: string, pass: string);
}
