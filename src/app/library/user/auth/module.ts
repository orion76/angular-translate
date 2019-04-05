import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AuthRequestInterceptor } from '@app-services/data/interceptors';
import { AUTH_PLUGIN, UserAuthService, USER_AUTH_SERVICE } from './auth.service';



@NgModule({
  declarations: [

  ],
  imports: [

  ],
  providers: [
    { provide: USER_AUTH_SERVICE, useClass: UserAuthService },
    { provide: HTTP_INTERCEPTORS, useClass: AuthRequestInterceptor, multi: true },
  ]
})
export class HTTPAuthModule {
  static Auth(authClass: any): ModuleWithProviders<HTTPAuthModule> {
    return {
      ngModule: HTTPAuthModule, providers: [
        { provide: AUTH_PLUGIN, useClass: authClass }
      ]
    };
  }
}
