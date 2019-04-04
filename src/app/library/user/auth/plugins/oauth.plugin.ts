import { HttpRequest } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from "@angular/core";
import { APP_CONFIG_SERVICE, IAppConfigService } from '@app-library/app-config';
import { IActionConfig, IAuthPlugin, IUserAuthService, RequestConfig } from '@app-library/user/auth/types';
import { DATA_SERVICE, IDataService } from '@app-services/data';


export type UOAuthTokenType = 'Bearer';

export interface IOAuthData {
  access_token: string,
  expires_in: number,
  refresh_token: string,
  token_type: UOAuthTokenType
}

@Injectable()
export class OAuthPluginService implements IAuthPlugin {


  constructor(
    @Inject(DATA_SERVICE) private data: IDataService,
    @Inject(APP_CONFIG_SERVICE) protected config: IAppConfigService,
  ) {

  }

  login(username: string, password: string) {
    const config: IActionConfig = RequestConfig.token;
    let formData: FormData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('scope', 'jsonapi');
    formData.append('client_secret', this.config.oauthId);
    formData.append('client_id', this.config.oauthId);
    formData.append('username', username);
    formData.append('password', password);
    return this.data.request('oauth', 'POST', this.createUrl(config.path), null, formData)

  }

  auth(req: HttpRequest<any>, authData: IOAuthData): HttpRequest<any> {
    let headers = req.headers;

    headers = headers.set('Authorization', `Bearer ${authData.access_token}`)
    return req.clone({ headers })
  }

  createUrl(path: string) {
    return `${path}`;
  }
}
