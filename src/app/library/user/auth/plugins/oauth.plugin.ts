import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, InjectionToken, Inject } from "@angular/core";
import { DATA_SERVICE, IDataService } from '@app-services/data';
import { APP_CONFIG_SERVICE, IAppConfigService } from '@app-library/app-config';
import { IUserAuthService, IActionConfig, RequestConfig, IAuthPlugin } from '@app-library/user/auth/types';
import { map } from 'rxjs/operators';

export const USER_AUTH_SERVICE = new InjectionToken<IUserAuthService>('USER_AUTHSERVICE');


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
    // const request: ITokenRequest = {
    //   grant_type: 'password',
    //   scope: 'jsonapi',
    //   client_secret: this.config.oauthId,
    //   client_id: this.config.oauthId,
    //   username, password
    // }
    let formData: FormData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('scope', 'jsonapi');
    formData.append('client_secret', this.config.oauthId);
    formData.append('client_id', this.config.oauthId);
    formData.append('username', username);
    formData.append('password', password);
    return this.data.request('oauth', 'POST', this.createUrl(config.path), null, formData)
      .pipe(
        map((data) => {

        })
      );

  }

  createUrl(path: string) {
    return `/${path}`;
  }
}
