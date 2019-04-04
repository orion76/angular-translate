import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { USER_AUTH_SERVICE, UserAuthService, AUTH_PLUGIN } from '@app-library/user/auth';
import { DataService, DATA_SERVICE } from '@app-services/data';
import { HeaderInterceptor, UrlInterceptor, AuthInterceptor } from '@app-services/data/interceptors';
import { OAuthPluginService } from '@app-library/user/auth/plugins/oauth.plugin';

@NgModule({
  declarations: [

  ],
  imports: [
    HttpClientModule,
  ],
  providers: [
    { provide: AUTH_PLUGIN, useClass: OAuthPluginService },
    { provide: USER_AUTH_SERVICE, useClass: UserAuthService },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: DATA_SERVICE, useClass: DataService },
  ]
})
export class AppHTTPModule { }
