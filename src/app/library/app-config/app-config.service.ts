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


export interface IEntryPointConfig {

  root: string,
  prefix?: string
}

export interface ISourceConfig {
  name: string,
  url: string
}

export type TEntrypoint = 'jsonapi' | 'auth'

export interface IAppConfigService {
  urlPrefix: string,
  get(source: string): Observable<ISourceConfig>,
  set(config: ISourceConfig),
  entrypoints: { [key in TEntrypoint]: IEntryPointConfig }
}

@Injectable()
export class AppConfigService implements IAppConfigService {

  urlPrefix = 'rest'

  public entrypoints = {
    auth: { root: '/' },
    jsonapi: { root: '/jsonapi' }
  }
  constructor() {

  }

  get(source: string) {
    return of(ConfigMock[source]);
  }

  set(config: ISourceConfig) {
    ConfigMock[config.name] = config
  }
}
