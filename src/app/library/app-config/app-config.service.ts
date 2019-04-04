import { Injectable, InjectionToken } from '@angular/core';
import { IKeyValueList } from '@app-library/ng-http-service/types';
import { Observable, of } from 'rxjs';
import { IAppConfigService, ISourceConfig } from './types';

export const APP_CONFIG_SERVICE = new InjectionToken<IAppConfigService>('APP_CONFIG_SERVICE');


const ConfigMock: IKeyValueList<ISourceConfig> = {
  user: {
    name: 'user',
    url: 'user'
  }
}




@Injectable()
export class AppConfigService implements IAppConfigService {
  oauthId = '69cd4610-69b8-431a-995f-d3ac9b2fc50d';
  urlPrefix = 'rest';

  public entrypoints = {
    oauth: { root: '/oauth' },
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
