import { Observable } from 'rxjs';

export interface IEntryPointConfig {

  root: string,
  prefix?: string
}

export interface ISourceConfig {
  name: string,
  url: string
}

export type TEntrypoint = 'jsonapi' | 'oauth'

export interface IAppConfigService {
  oauthId: string;
  urlPrefix: string,
  get(source: string): Observable<ISourceConfig>,
  set(config: ISourceConfig),
  entrypoints: { [key in TEntrypoint]: IEntryPointConfig }
}
