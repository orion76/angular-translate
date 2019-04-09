import {NgModule, ModuleWithProviders, InjectionToken} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {USER_AUTH_SERVICE, UserAuthService, IAuthPlugin} from '@app-library/user/auth';
import {DataService, DATA_SERVICE} from '@app-services/data';
import {HeaderRequestInterceptor, UrlRequestInterceptor, AuthRequestInterceptor} from '@app-services/data/interceptors';
import {OAuthPluginService} from '@app-library/user/auth/plugins/oauth.plugin';
import {ConvertResponseInterceptor, RESPONSE_CONVERTER_PLUGIN} from '@app-services/data/interceptors/response/convert.interceptor';


@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  providers: [

    {provide: HTTP_INTERCEPTORS, useClass: HeaderRequestInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UrlRequestInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ConvertResponseInterceptor, multi: true},
    {provide: DATA_SERVICE, useClass: DataService},
  ]
})
export class HTTPDataModule {
  static convert(convertClass: any): ModuleWithProviders<HTTPDataModule> {
    return {
      ngModule: HTTPDataModule, providers: [
        {provide: RESPONSE_CONVERTER_PLUGIN, multi: true, useClass: convertClass}
      ]
    };
  }
}
