import { Inject, Injectable, InjectionToken } from "@angular/core";
import { APP_CONFIG_SERVICE, IAppConfigService } from '@app-library/app-config';
import { IAuthPlugin, IUserAuthService } from '@app-library/user/auth/types';
import { IAppState } from '@app-store/app-store.module';
import { Store } from '@ngrx/store';
import { StoreSelectors as UserSelectors, StoreActions as UserActions, StoreState } from '../store';
import { take, switchMap, tap } from 'rxjs/operators';
export const USER_AUTH_SERVICE = new InjectionToken<IUserAuthService>('USER_AUTHSERVICE');
export const AUTH_PLUGIN = new InjectionToken<IAuthPlugin>('AUTH_PLUGIN');

import TStateUser = StoreState.TStateUser;

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

    this.store.dispatch(new UserActions.Add({ source: 'user', id: username }));

    this.store.pipe(
      // tap(() => console.log('11111')),
      take(1),
      this.selectors.entity,

      this.selectors.isStatus({ REQUEST: true }),
      tap(() => console.log('33333')),
      tap(() => this.plugin.login(username, password)),
      this.selectors.isStatus({ AUTHENTICATED: true }),
      tap((state: TStateUser) => this.store.dispatch(new UserActions.LOAD(state.data.request))),
      this.selectors.isStatus({ LOAD_SUCCESS: true }),
      tap(() => this.store.dispatch(new UserActions.Login())),
      this.selectors.isStatus({ LOGIN: true }),
      take(1)
    ).subscribe(() => true)
  }

  createUrl(path: string) {
    return `/${path}`;
  }
}
