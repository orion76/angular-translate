import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from "@angular/core";
import { APP_CONFIG_SERVICE, IAppConfigService, ISourceConfig } from '@app-library/app-config/app-config.service';

import { SOURFCE_PARSE_SERVICE } from '@app-services/injection-tokens';
import { ISourceParseService } from '@app-services/source-parse.service';
import { IEntity } from '@xangular-common/entity';
import { IEntityRequest } from '@xangular-store/entity/types';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { IHTTPOptotions } from '@app-services/data';
import { RequestJsonApi } from '@app-services/data/request/jsonapi/request-jsonapi';
import { IRequest } from '@app-services/data/request/types';


export const DATA_SERVICE = new InjectionToken<IDataService>('DATA_SERVICE');


export interface IDataService {
  getItem(request: IEntityRequest): Observable<IEntity>
  // getUser(uid: string): Observable<IUser>;
}

@Injectable()
export class DataService implements IDataService {
  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG_SERVICE) protected config: IAppConfigService,
    @Inject(SOURFCE_PARSE_SERVICE) protected parser: ISourceParseService,
  ) {

  }

  getItem(request: IEntityRequest): Observable<IEntity> {

    return this.config.get(request.source)
      .pipe(
        map((config: ISourceConfig) => new RequestJsonApi(request, config)),
        switchMap((request: IRequest) => {
          return this.request('GET', request.path().join('/'), request.query())
        }),
    )
  }

  baseUrl(): string[] {
    const rest = this.config.rest;
    const basePath: string[] = [];
    if (rest.prefix && rest.prefix.length > 0) {
      basePath.push(rest.prefix);
    }

    if (rest.path && rest.path.length > 0) {
      basePath.push(rest.path);
    }

    return basePath;
  }


  sourceUrl(config: ISourceConfig, request: IEntityRequest) {
    const path: string[] = config.url.split('/').filter(Boolean);
    if (request.id) {
      path.push(request.id)
    }
    return path;
  }

  createUrl(config: ISourceConfig, request: IEntityRequest) {

    const path = [config.url];

    if (request.id) {
      path.push(request.id)
    }

    return path.join('/');
  }



  private request(method: string, url: string, params: HttpParams) {


    const options: IHTTPOptotions = {
      // headers: {
      //   'Content-type': 'application/json'
      // },
      params,
      // withCredentials: true
    };

    let response: any;

    switch (method) {
      case "GET":
        response = this.http.get(url, options);
        break;
      case "POST":
        response = this.http.post(url, null, options);
        break;
    }

    return response.pipe(tap((response) => {
      console.log('[DATA LOAD]', { url, options, response })
    }));
  }
}
