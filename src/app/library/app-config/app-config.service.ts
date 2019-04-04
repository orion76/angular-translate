import { Injectable, InjectionToken } from '@angular/core';
import { IKeyValueList } from '@app-library/ng-http-service/types';
import { Observable, of } from 'rxjs';
import { IAppConfigService, ISourceConfig, TEntrypoint } from './types';
import { trimSlash } from '@app-services/data/utils';

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
    oauth: { root: 'oauth' },
    jsonapi: { root: 'jsonapi' }
  }
  constructor() {

  }

  get(source: string) {
    return of(ConfigMock[source]);
  }

  set(config: ISourceConfig) {
    ConfigMock[config.name] = config
  }

  pathEntrypoint(name: TEntrypoint) {
    let url = [];
    if (this.urlPrefix && this.urlPrefix.length > 0) {
      url.push(this.urlPrefix);
    }

    url.push(this.entrypoints[name].root);
    return `${url.join('/')}`;
  }

  isEntrypoint(url: string, entrypoint: TEntrypoint) {
    const path = this.pathEntrypoint(entrypoint);
    return trimSlash(url).startsWith(path);
  }
}
