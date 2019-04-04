import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAppConfigService, APP_CONFIG_SERVICE } from '@app-library/app-config';
import { IAuthPlugin, AUTH_PLUGIN, IUserAuthService } from '@app-library/user/auth';
import { switchMap, map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from '@app-store/app-store.module';
import { StoreSelectors, StoreState } from '@app-library/user/store';
import { USER_AUTH_SERVICE } from '@app-library/user/auth/plugins/oauth.plugin';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<IAppState>,
    @Inject(APP_CONFIG_SERVICE) private config: IAppConfigService,
    @Inject(USER_AUTH_SERVICE) private service: IUserAuthService
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.startsWith('/jsonapi')) {
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
