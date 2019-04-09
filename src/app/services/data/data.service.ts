import {HttpClient, HttpParams} from '@angular/common/http';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {APP_CONFIG_SERVICE, IAppConfigService, ISourceConfig, TEntrypoint} from '@app-library/app-config';

import {SOURFCE_PARSE_SERVICE} from '@app-services/injection-tokens';
import {ISourceParseService} from '@app-services/source-parse.service';
import {IEntity} from '@xangular-common/entity';
import {IEntityRequest} from '@xangular-store/entity/types';
import {Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {IHTTPOptotions} from '@app-services/data';
import {RequestJsonApi} from '@app-services/data/request/jsonapi/request-jsonapi';
import {IRequest} from '@app-services/data/request/types';
import {Store} from '@ngrx/store';
import {IAppState} from '@app-store/app-store.module';


export const DATA_SERVICE = new InjectionToken<IDataService>('DATA_SERVICE');


export interface IDataService {
  request(entrypoint: TEntrypoint, method: string, url: string, params?: HttpParams, data?: any): Observable<any>;

  getItem<T extends IEntity>(request: IEntityRequest): Observable<T>;

  save(entity: IEntity): Observable<IEntity>;

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

  getItem<T extends IEntity>(request: IEntityRequest): Observable<T> {

    return this.config.get(request.source)
      .pipe(
        map((config: ISourceConfig<T>) => new RequestJsonApi(request, config)),
        switchMap((request: IRequest) => {
          return this.request('jsonapi', 'GET', request.path(), request.query());
        }),
        map((data: IEntity) => data[0] ? data[0] : null)
      );
  }

  getItems<T extends IEntity>(request: IEntityRequest): Observable<T[]> {

    return this.config.get(request.source)
      .pipe(
        map((config: ISourceConfig<T>) => new RequestJsonApi(request, config)),
        switchMap((request: IRequest) => {
          return this.request('jsonapi', 'GET', request.path(), request.query());
        })
      );
  }

  save<T extends IEntity>(entity: T) {
    const request: IEntityRequest = {source: entity.source};
    return this.config.get(request.source)
      .pipe(
        map((config: ISourceConfig<T>) => new RequestJsonApi(request, config)),
        switchMap((request: IRequest) => {
          return this.request('jsonapi', 'POST', request.path(), request.query());
        }),
      );

  }


  public request<T>(entrypoint: TEntrypoint, method: string, url: string, params?: HttpParams, data?: any): Observable<T> {
    // console.log('[data.request]', {entrypoint, method, url, params, data});

    const entrypointConfig = this.config.entrypoints[entrypoint];

    if (entrypointConfig.root && entrypointConfig.root.length > 0) {
      url = `${entrypointConfig.root}/${url}`;
    }

    const options: IHTTPOptotions = {params};

    let response: any;

    switch (method) {
      case 'GET':
        response = this.http.get(url, options);
        break;
      case 'POST':
        response = this.http.post(url, data, options);
        break;
    }

    return response.pipe(tap((response) => {
      console.log('[DATA LOAD]', {url, options, response});
    }));
  }
}
