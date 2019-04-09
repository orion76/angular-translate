import {NgModule} from '@angular/core';
import {HTTPAuthModule} from '@app-library/user/auth/module';
import {OAuthPluginService} from '@app-library/user/auth/plugins/oauth.plugin';
import {HTTPDataModule} from '@app-services/data/module';
import {ResponseJsonapiConverter} from '@app-services/data/response/converters/jsonapi/jsonapi-converter.service';
import {ResponseOauthConverter} from '@app-services/data/response/converters/oauth/oauth-converter.service';


@NgModule({
  declarations: [],
  imports: [
    HTTPDataModule,
    HTTPDataModule.convert(ResponseOauthConverter),
    HTTPDataModule.convert(ResponseJsonapiConverter),
    HTTPAuthModule,
    HTTPAuthModule.Auth(OAuthPluginService)
  ],
  providers: []
})
export class AppHTTPModule {
}
