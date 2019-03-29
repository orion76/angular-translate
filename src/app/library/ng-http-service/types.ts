import { IEntity } from "./entity/IEntity";
import { Observable } from 'rxjs';
import { JSONAPIFilter } from '@app-library/ng-http-service/converters/types';
import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface IKeyValueList<T> {
  [key: string]: T;
}

export type THttpResponse = IEntity | IEntity[];

export type THTTPObserve = 'body';

export interface IHTTPRequest {
  url: string;
  params: HttpParams
}

export type THttpOptions = Partial<IHttpOptions>;


export interface IHttpOptions {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  observe: THTTPObserve;
  params?: HttpParams | {
    [param: string]: string | string[];
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

export interface IConfigService {
  get<T>(configId: string): Observable<T>
}
export interface ProviderIdService {
  get(): string
}

export interface IHTTPService {

  config: IConfigService;
  loadItem(source: string, id: string, params?: any): Observable<IEntity>;

  loadItems(source: string, filters?: JSONAPIFilter[] | JSONAPIFilter): Observable<IEntity[]>;

  newItem(source: string, default_fields): Observable<IEntity>;

  createItem(entity: IEntity): Observable<IEntity>;

  updateItem(entity: IEntity): Observable<IEntity>;

  deleteItem(entity: IEntity): Observable<IEntity>;

  loadOptions(source: string): Observable<any>
}
