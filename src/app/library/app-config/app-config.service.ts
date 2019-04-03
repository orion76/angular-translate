import { Injectable, InjectionToken } from '@angular/core';
import { IKeyValueList } from '@app-library/ng-http-service/types';
import { Observable, of } from 'rxjs';

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
  set(config: ISourceConfig),
  rest: IRestConfig
}

@Injectable()
export class AppConfigService implements IAppConfigService {

  rest: IRestConfig = {
    prefix: 'rest',
    path: 'jsonapi',
  }

  get(source: string) {
    return of(ConfigMock[source]);
  }

  set(config: ISourceConfig) {
    ConfigMock[config.name] = config
  }
}
