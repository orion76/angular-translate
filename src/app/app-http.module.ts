import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { USER_AUTH_SERVICE, UserAuthService } from '@app-library/user/auth.service';
import { DataService, DATA_SERVICE } from '@app-services/data';
import { HeaderInterceptor, UrlInterceptor, AuthInterceptor } from '@app-services/data/interceptors';

@NgModule({
  declarations: [

  ],
  imports: [
    HttpClientModule,
  ],
  providers: [
    { provide: USER_AUTH_SERVICE, useClass: UserAuthService },
    { provide: DATA_SERVICE, useClass: DataService },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class AppHTTPModule { }
