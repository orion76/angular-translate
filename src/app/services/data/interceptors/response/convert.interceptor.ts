import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { IUserAuthService, USER_AUTH_SERVICE } from '@app-library/user/auth';
import { Observable } from 'rxjs';
import { switchMap, tap, filter } from 'rxjs/operators';
import { APP_CONFIG_SERVICE, IAppConfigService } from '@app-library/app-config';
import { IResponseConverterPlugin } from '@app-services/data/response/types';


export const RESPONSE_CONVERTER_PLUGIN = new InjectionToken<IResponseConverterPlugin>('RESPONSE_CONVERTER_PLUGIN');

@Injectable()
export class ConvertResponseInterceptor implements HttpInterceptor {

  constructor(
    @Inject(RESPONSE_CONVERTER_PLUGIN) private plugin: IResponseConverterPlugin,
   ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      filter((event) => event instanceof HttpResponse),
      switchMap(this.plugin.convert)
    )
  }
}
