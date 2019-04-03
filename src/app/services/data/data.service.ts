import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from "@angular/core";
import { APP_CONFIG_SERVICE, IAppConfigService, ISourceConfig } from '@app-library/app-config/app-config.service';
import { UrlJsonApi } from '@app-services/data/url/jsonapi/url-jsonapi';
import { SOURFCE_PARSE_SERVICE } from '@app-services/injection-tokens';
import { ISourceParseService } from '@app-services/source-parse.service';
import { IEntity } from '@xangular-common/entity';
import { IEntityRequest } from '@xangular-store/entity/types';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';





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
        map((config: ISourceConfig) => this.createUrl(config, request)),
        switchMap((url: string) => this.request('GET', url)),
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

  addParams() {

  }

  sourceUrl(config: ISourceConfig, request: IEntityRequest) {
    const path: string[] = config.url.split('/').filter(Boolean);
    if (request.id) {
      path.push(request.id)
    }
    return path;
  }

  createUrl(config: ISourceConfig, request: IEntityRequest) {

    const path = this.baseUrl();

    const generator = new UrlJsonApi(request, config);
    path.push(generator.sourceUrl());
    const query = generator.query();
    console.log('[CREATE URL]', { path, query });

    let url = path.join('/');
    if (query) {
      url = `${url}?${query}`;
    }

    return url;
  }



  private request(method: string, url: string, data?: any) {


    const options: { headers?: { [header: string]: string | string[] } } = {
      headers: {
        'Content-type': 'application/json'
      },
    };

    let response: any;

    switch (method) {
      case "GET":
        response = this.http.get(url, options);
        break;
      case "POST":
        response = this.http.post(url, data, options);
        break;
    }

    return response.pipe(tap((response) => {
      console.log('[DATA LOAD]', { url, options, response })
    }));
  }
}
