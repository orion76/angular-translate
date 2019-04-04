import { Inject, Injectable, InjectionToken } from "@angular/core";
import { APP_CONFIG_SERVICE, IAppConfigService, TEntrypoint } from '@app-library/app-config';
import { IAuthPlugin, IUserAuthService } from '@app-library/user/auth/types';
import { IAppState } from '@app-store/app-store.module';
import { Store } from '@ngrx/store';
import { StoreSelectors as UserSelectors, StoreActions as UserActions, StoreState } from '../store';
import { take, switchMap, tap, map } from 'rxjs/operators';



export const USER_AUTH_SERVICE = new InjectionToken<IUserAuthService>('USER_AUTHSERVICE');
export const AUTH_PLUGIN = new InjectionToken<IAuthPlugin>('AUTH_PLUGIN');

import TStateUser = StoreState.TStateUser;
import { IEntityRequest, EFilterOperator } from '@xangular-store/entity/types';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserAuthService implements IUserAuthService {

  selectors = UserSelectors.selectors;
  constructor(
    private store: Store<IAppState>,
    @Inject(AUTH_PLUGIN) private plugin: IAuthPlugin,
    @Inject(APP_CONFIG_SERVICE) protected config: IAppConfigService,
  ) {

  }

  login(username: string, password: string) {

    const request: IEntityRequest = {
      source: 'user',
      filters: [
        {
          name: 'user-name',
          condition: {
            path: ['name'],
            operator: EFilterOperator.EQUAL,
            value: username
          }
        }
      ]
    }

    this.store.dispatch(new UserActions.Add(request));

    this.store.pipe(
      // tap(() => console.log('11111')),

      this.selectors.entity,

      this.selectors.isStatus({ REQUEST: true }),
      take(1),
      switchMap(() => {
        return this.plugin.login(username, password).pipe(
          tap((authData: any) => this.store.dispatch(new UserActions.Authenticate(authData))),
          switchMap(() => this.store.pipe(
            this.selectors.entity,
            this.selectors.isStatus({ AUTHENTICATED: true }))
          )
        );
      }),
      take(1),
      tap(() => console.log('44444')),
      tap((state: TStateUser) => this.store.dispatch(new UserActions.LOAD(state.data.request))),
      this.selectors.isStatus({ LOAD_SUCCESS: true }),
      tap(() => console.log('55555')),
      tap(() => this.store.dispatch(new UserActions.Login())),
      this.selectors.isStatus({ LOGIN: true }),
      tap(() => console.log('77777')),
      take(1)
    ).subscribe(() => true)
  }

  auth(req: HttpRequest<any>): Observable<HttpRequest<any>> {

    return this.store.pipe(
      this.selectors.data,
      map((data: StoreState.IUserStates) => data.authData),
      map((authData: any) => this.plugin.auth(req, authData)),
      take(1)
    )
  }

  createUrl(path: string) {
    return `/${path}`;
  }
}
