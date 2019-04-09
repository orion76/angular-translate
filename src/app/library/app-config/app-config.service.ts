import {Inject, Injectable, InjectionToken} from '@angular/core';
import {IAppConfigService, ILanguage, ISourceConfig, TEntrypoint} from './types';
import {trimSlash} from '@app-services/data/utils';
import {StoreActions} from './store/actions';
import {Store} from '@ngrx/store';
import {IAppState} from '@app-store/app-store.module';
import {StoreSelectors} from './store/selectors';
import {StoreState} from '@app-library/app-config/store';
import {map} from 'rxjs/operators';
import IConfigStates = StoreState.IConfigStates;

export const APP_CONFIG_SERVICE = new InjectionToken<IAppConfigService>('APP_CONFIG_SERVICE');
export const SOURCE_CONFIG = new InjectionToken<IAppConfigService>('SOURCE_CONFIG');


const selectors = StoreSelectors.selectors;

const languages: ILanguage[] = [
  {langcode: 'ru', label: 'Russian'},
  {langcode: 'en', label: 'English'},
  {langcode: 'de', label: 'Deutsch'},
];

@Injectable()
export class AppConfigService implements IAppConfigService {
  oauthId = '69cd4610-69b8-431a-995f-d3ac9b2fc50d';
  urlPrefix = 'rest';

  public entrypoints = {
    oauth: {root: 'oauth'},
    jsonapi: {root: 'jsonapi'}
  };

  public languages = languages;

  constructor(
    @Inject(SOURCE_CONFIG) sources: ISourceConfig<any>[][],
    private store: Store<IAppState>
  ) {
    sources
      .reduce((all: ISourceConfig<any>[], list: ISourceConfig<any>[]) => [...all, ...list], [])
      .forEach((source: ISourceConfig<any>) => this.store.dispatch(new StoreActions.Add(source.name, source)));
  }

  get(source: string) {
    return this.store.pipe(
      selectors.data({stateId: source}),
      map((data: IConfigStates) => data.config)
    );
  }


  pathEntrypoint(name: TEntrypoint) {
    const url = [];
    if (this.urlPrefix && this.urlPrefix.length > 0) {
      url.push(this.urlPrefix);
    }

    url.push(this.entrypoints[name].root);
    return `${url.join('/')}`;
  }

  getEntrypoint(url: string) {
    let entrypoint: TEntrypoint;
    Object.keys(this.entrypoints).every((name: TEntrypoint) => {
      if (this.isEntrypoint(url, name)) {
        entrypoint = name;
        return false;
      }
      return true;
    });
    return entrypoint;
  }

  isEntrypoint(url: string, entrypoint: TEntrypoint) {
    const path = this.pathEntrypoint(entrypoint);
    return trimSlash(url).startsWith(path);
  }
}
