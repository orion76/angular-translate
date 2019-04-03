import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, InjectionToken } from "@angular/core";

export const USER_AUTH_SERVICE = new InjectionToken<IUserAuthService>('USER_AUTHSERVICE');

export type TActions = 'login';
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
  login: {
    method: 'POST',
    header: 'Content-type: application/json',
    path: 'user/login',
    format: 'json'
  }
}

export interface IUserAuthService {
  login(login: string, pass: string);
}

@Injectable()
export class UserAuthService implements IUserAuthService {
  constructor(private http: HttpClient) {

  }
  private request(method: string, url: string, data?: any) {


    const options: IHTTPOptotions = {
      headers: {
        'Content-type': 'application/json'
      },
      withCredentials: true
    };

    let response: any;

    switch (method) {
      case "POST":
        response = this.http.post(url, data, options);
        break;
    }
    return response;
  }
  login(name: string, pass: string) {
    const config: IActionConfig = RequestConfig.login;
    return this.request(config.method, this.createUrl(config.path, config.format), { name, pass });
  }

  createUrl(path: string, format: THTTPFormat) {
    return `/rest/${path}?_format=${format}`;
  }
}
