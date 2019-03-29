import { Injectable } from '@angular/core';


import { HttpClient, HttpParams } from '@angular/common/http';


import { Params } from '@angular/router';

import { Observable } from "rxjs";
import { concatMap, map, tap } from "rxjs/internal/operators";

import { IHTTPService, THttpResponse, THttpOptions, IHttpOptions, IHTTPRequest, IConfigService, ProviderIdService } from './types';
import { HTTPResponseConverter } from './http-interceptors/converter.service';

import { JSONAPIFilter } from '@app-library/ng-http-service/converters/types';
import { ISourceConfigRestQuery, ISourceConfig } from '@app-library/ng-http-service/types/source-config';
import { EEntityDeleted, IEntityClass } from '@app-library/ng-http-service/entity/types';
import { IEntity } from "@app-library/ng-http-service/entity/IEntity";
import { Entity } from '@app-library/ng-http-service/entity/entity.class';



@Injectable()
export class HTTPService implements IHTTPService {


  constructor(public config: IConfigService,
    private http: HttpClient,
    protected id: ProviderIdService,
    protected converter: HTTPResponseConverter,
    // private loadIndicator: LoadIndicator,
  ) {

  }

  send(method: string, request: IHTTPRequest, data?: any): Observable<THttpResponse> {


    let result: Observable<THttpResponse>;
    switch (method) {
      case 'OPTIONS':
        result = this.http.options<THttpResponse>(request.url, this._httpOptions());
        break;
      case 'GET':
        result = this.http.get<THttpResponse>(request.url, this._httpOptions({ params: request.params }));
        break;
      case 'CREATE':
        result = this.http.post<THttpResponse>(request.url, data, this._httpOptions());
        break;
      case 'UPDATE':
        result = this.http.patch<THttpResponse>(request.url, data, this._httpOptions());
        break;
      case 'DELETE':
        result = this.http.delete<THttpResponse>(request.url, this._httpOptions());
        break;
      default:

        break;
    }
    return result;
  }


  loadItem(source: string, id: string): Observable<IEntity> {



    const query: ISourceConfigRestQuery = { id };

    return this._query('GET', source, query).pipe(
      map((data) => (data[0]) as IEntity),

    );
  }


  loadItems(source: string, filters?: JSONAPIFilter[]): Observable<IEntity[]> {

    const query: ISourceConfigRestQuery = {};

    if (filters && filters.length > 0) {
      query.filters = filters.reduce((acc: any, filter: JSONAPIFilter) => {
        acc[filter.fieldName] = filter.value;
        return acc;
      }, {});

    }

    return this._query('GET', source, query) as Observable<IEntity[]>;
  }

  createUrl(url: string, id?: string) {
    return id ? `${url}/${id}` : url;
  }

  createParams(rest?: ISourceConfigRestQuery): HttpParams {
    const params: Params = {};
    if (rest) {
      if (rest.include && rest.include.length > 0) {
        params['include'] = rest.include.join(',');
      }

      if (rest.filters && Object.keys(rest.filters).length > 0) {

        Object.keys(rest.filters).forEach((fieldName: string) => {
          const value: string[] = rest.filters[fieldName];
          params[`filter[${fieldName}]`] = value.join(',');
        });

      }
    }


    return new HttpParams({ fromObject: params });
  }


  createRequest(config: ISourceConfig, query?: ISourceConfigRestQuery): IHTTPRequest {
    const params = query.id ?
      this.createParams({ ...config.one, ...query }) :
      this.createParams({ ...config.list, ...query });

    return {
      url: this.createUrl(config.url, query.id),
      params: params
    };
  }

  _query(method: string, source: string, query?: ISourceConfigRestQuery, data?: any): Observable<THttpResponse> {
    return this.config.get(source)
      .pipe(
        concatMap((config: ISourceConfig) => {
          const request = this.createRequest(config, query);

          return this.send(method, request, data).pipe(
            map((result) => this.converter.convertResponse(method, config, result))
          );
        }),
    );
  }


  loadOptions(source: string) {
    return this._query('OPTIONS', source);
  }

  deleteItem(entity: IEntity) {
    entity.deleted = EEntityDeleted.DELETED;
    return this.updateItem(entity);
  }

  newItem(source: string, default_fields = {}): Observable<IEntity> {

    return this.config.get(source).pipe(
      map((options: ISourceConfig) => {
        const entity: IEntityClass = new Entity(source, this.id.get(), options.fields);
        entity.is_new = true;

        return entity;

      }));

  }


  save(entity: IEntityClass) {

    if (entity.is_new) {
      return this.createItem(entity);
    } else {
      return this.updateItem(entity);
    }
  }

  public createItem(entity: IEntity): Observable<IEntity> {

    const query: ISourceConfigRestQuery = { id: entity.entityId };

    return this._query('CREATE', entity.source, query, entity) as Observable<IEntity>;
  }

  public updateItem(entity: IEntity): Observable<IEntity> {
    const query: ISourceConfigRestQuery = { id: entity.entityId };
    return this._query('UPDATE', entity.source, query, entity) as Observable<IEntity>;
  }

  private _httpOptions(options: THttpOptions = {}): IHttpOptions {
    return { observe: 'body', ...options };
  }
}
