import {Observable} from 'rxjs';
import {TEntityFields} from '@app-library/components/form/types';

export type ULanguages = 'ru' | 'en' | 'de';

export interface ILanguage {
  langcode: ULanguages;
  label: string;
}


export interface IEntryPointConfig {

  root: string;
  prefix?: string;
}

export interface ISourceConfig<E> {
  name: string;
  url: string;
  fields: TEntityFields<E>;
}

export type TEntrypoint = 'jsonapi' | 'oauth';

export interface IAppConfigService {
  oauthId: string;
  urlPrefix: string;
  entrypoints: { [key in TEntrypoint]: IEntryPointConfig };
  languages: ILanguage[];

  get(source: string): Observable<ISourceConfig<any>>;

  isEntrypoint(url: string, entrypoint: TEntrypoint);

  getEntrypoint(url: string): TEntrypoint;
}
