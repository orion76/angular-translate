import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IUserAuthService, USER_AUTH_SERVICE } from '@app-library/user/auth';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { APP_CONFIG_SERVICE, IAppConfigService } from '@app-library/app-config';


@Injectable()
export class AuthRequestInterceptor implements HttpInterceptor {

  constructor(
    @Inject(USER_AUTH_SERVICE) private service: IUserAuthService,
    @Inject(APP_CONFIG_SERVICE) private config: IAppConfigService,
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.config.isEntrypoint(req.url, 'jsonapi')) {
      return this.service.auth(req)
        .pipe(
          tap((req: HttpRequest<any>) => console.log('[AUTH]', req)),
          switchMap((req: HttpRequest<any>) => next.handle(req))

        );

    } else {
      return next.handle(req);
    }

  }
}
