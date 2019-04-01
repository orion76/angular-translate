import { Observable, of } from 'rxjs';
import { InjectionToken, Injectable } from '@angular/core';
import { ISourceParseService } from '@app-services/source-parse.service';
import { IKeyValueList } from '@app-library/ng-http-service/types';

export const APP_CONFIG_SERVICE = new InjectionToken<IAppConfigService>('APP_CONFIG_SERVICE');


const ConfigMock: IKeyValueList<ISourceConfig> = {
  user: {
    name: 'user',
    url: 'user'
  }
}


export interface IRestConfig {

  path: string,
  prefix?: string
}

export interface ISourceConfig {
  name: string,
  url: string
}

export interface IAppConfigService {
  get(source: string): Observable<ISourceConfig>,
  set(config: ISourceConfig)
}

@Injectable()
export class AppConfigService implements IAppConfigService {

  rest = {
    path: 'jsonapi',
    prefix: 'rest',
  }

  get(source: string) {
    return of(ConfigMock[source]);
  }

  set(config: ISourceConfig) {
    ConfigMock[config.name] = config
  }
}
