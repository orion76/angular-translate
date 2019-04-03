import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, InjectionToken, Inject } from "@angular/core";
import { DATA_SERVICE, IDataService } from '@app-services/data';

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


  constructor(@Inject(DATA_SERVICE) private data: IDataService) {

  }

  login(name: string, pass: string) {
    const config: IActionConfig = RequestConfig.login;
    let params = new HttpParams();
    params = params.set('_format', config.format);

    return this.data.request('auth', 'POST', this.createUrl(config.path), params, { name, pass });

  }

  createUrl(path: string) {
    return `/${path}`;
  }
}
